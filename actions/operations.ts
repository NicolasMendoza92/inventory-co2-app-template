import { OperationSchema } from "@/schemas";
import { z } from "zod";
import { db } from "@/lib/db";

export const createOperation = async (
  projectId: string,
  values: z.infer<typeof OperationSchema>
) => {
  const validatedFields = OperationSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid fields!" };
  }

  const {
    transactionType,
    salesTeam,
    client,
    project,
    user,
    quantity,
    sellPrice,
    purchasePrice,
    deliveryStatus,
    deliveryDate,
    paymentStatus,
    paymentDate,
    internalNotes,
    files,
    dynamicFields,
  } = validatedFields.data;

  try {
    // defino el contexto de trasnaccion para poder atomizar la funcion
    // todo lo que ocurra en el objeto trasnaction se ejecuta en simultaneo, si uno falla fallan todos
    const result = await db.$transaction(async (trans) => {
      const operation = await trans.operation.create({
        data: {
          transactionType,
          salesTeam,
          client: {
            connect: { id: client },
          },
          project: {
            connect: { id: project },
          },
          user: {
            connect: { id: user },
          },
          quantity,
          sellPrice,
          purchasePrice,
          deliveryStatus,
          deliveryDate: deliveryDate || null,
          paymentStatus,
          paymentDate: paymentDate || null,
          internalNotes,
          files,
          dynamicFields,
        },
      });

      // Logica de tipo de operacion
      if (transactionType === "sale") {
        await trans.project.update({
          where: { id: projectId },
          data: {
            volume: { decrement: quantity },
          },
        });
      } else if (transactionType === "purchase") {
        await trans.project.update({
          where: { id: projectId },
          data: {
            volume: { increment: quantity },
          },
        });
      }

      return operation;
    });

    return { success: "Operation created successfully", operation: result };
  } catch (error) {
    return { error: "Error creating operation" };
  }
};

export const getOperationById = async (operationId: string) => {
  try {
    const operation = await db.operation.findUnique({
      where: { id: operationId },
    });

    if (!operation) {
      return { error: "Operation not found" };
    }

    return { operation };
  } catch (error) {
    return { error: "Error fetching operation" };
  }
};

export const updateOperation = async (
  projectId: string,
  operationId: string,
  values: z.infer<typeof OperationSchema>
) => {
  const validatedFields = OperationSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid fields!" };
  }

  const {
    client,
    project,
    user,
    transactionType,
    salesTeam,
    quantity,
    deliveryDate,
    paymentDate,
    sellPrice,
    purchasePrice,
    deliveryStatus,
    paymentStatus,
    internalNotes,
    files,
    dynamicFields,
  } = validatedFields.data;

  try {
    const result = await db.$transaction(async (trans) => {
      // busco la operacion que ya existe con el id que mando en params
      const existingOperation = await trans.operation.findUnique({
        where: { id: operationId },
      });

      if (!existingOperation) {
        return { error: "Operation not found!" };
      }

      // Verifico cantidades
      if (existingOperation.quantity !== quantity) {
        const quantityDifference = quantity - existingOperation.quantity;

        // Actualizo el volumen basado en la diferencia de cantidades
        if (transactionType === "sale") {
          await trans.project.update({
            where: { id: projectId },
            data: {
              volume: { decrement: quantityDifference },
            },
          });
        } else if (transactionType === "purchase") {
          await trans.project.update({
            where: { id: projectId },
            data: {
              volume: { increment: quantityDifference },
            },
          });
        }
      }

      // Actualizar la operación si es que cambiaron otras cosas
      const updatedOperation = await trans.operation.update({
        where: { id: operationId },
        data: {
          transactionType,
          salesTeam,
          client: { connect: { id: client } },
          project: { connect: { id: project } },
          user: { connect: { id: user } },
          quantity,
          sellPrice,
          purchasePrice,
          deliveryStatus,
          deliveryDate: deliveryDate || null,
          paymentStatus,
          paymentDate: paymentDate || null,
          internalNotes,
          files,
          dynamicFields,
        },
      });

      return updatedOperation;
    });

    return { success: "Operation updated successfully", operation: result };
  } catch (error) {
    return { error: "Error updating operation" };
  }
};

export const deleteOperation = async (
  operationId: string,
  projectId: string
) => {
  try {
    const result = await db.$transaction(async (tx) => {
      // busco la operacion la cual deseo eliminar para extraer datos
      const existingOperation = await tx.operation.findUnique({
        where: { id: operationId },
      });

      if (!existingOperation) {
        return { error: "Operation not found!" };
      }

      const { quantity, transactionType } = existingOperation;

      // veo la logica para el proyecto
      if (transactionType === "sale") {
        await tx.project.update({
          where: { id: projectId },
          data: {
            volume: { increment: quantity },
          },
        });
      } else if (transactionType === "purchase") {
        await tx.project.update({
          where: { id: projectId },
          data: {
            volume: { decrement: quantity },
          },
        });
      }
      //  si va todo bien, borro
      await tx.operation.delete({
        where: { id: operationId },
      });

      return { success: "Operation deleted successfully" };
    });

    return result;
  } catch (error) {
    console.error(error);
    return { error: "Error deleting operation" };
  }
};
