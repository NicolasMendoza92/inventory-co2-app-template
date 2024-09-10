import { ReserveSchema } from "@/schemas";
import { z } from "zod";
import { db } from "@/lib/db";

export const createReserve = async (
  projectId: string,
  values: z.infer<typeof ReserveSchema>
) => {
  const validatedFields = ReserveSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid fields!" };
  }

  const {
    salesTeam,
    client,
    project,
    reserveOwner,
    reservePrice,
    reserveQuantity,
    status,
    expirationDate,
    reserveComments,
  } = validatedFields.data;

  try {
    const result = await db.$transaction(async (tx) => {
      const reserve = await tx.reserve.create({
        data: {
          salesTeam,
          client: {
            connect: { id: client },
          },
          project: {
            connect: { id: project },
          },
          reserveOwner,
          reservePrice,
          reserveQuantity,
          status,
          expirationDate,
          reserveComments,
        },
      });
      // actualizo la cantidad del proyecto
      await tx.project.update({
        where: { id: projectId },
        data: {
          volume: { decrement: reserveQuantity },
        },
      });
      return reserve;
    });

    return { success: "Reserve created successfully", reserve: result };
  } catch (error) {
    return { error: "Error creating reserve" };
  }
};

export const getReserveById = async (reserveId: string) => {
  try {
    const reserve = await db.reserve.findUnique({
      where: { id: reserveId },
    });

    if (!reserve) {
      return { error: "Reserve not found" };
    }

    return { reserve };
  } catch (error) {
    return { error: "Error fetching reserve" };
  }
};

export const updateReserve = async (
  projectId: string,
  reserveId: string,
  values: z.infer<typeof ReserveSchema>
) => {
  const validatedFields = ReserveSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid fields!" };
  }

  const {
    client,
    project,
    salesTeam,
    reserveOwner,
    reserveQuantity,
    reservePrice,
    status,
    expirationDate,
    reserveComments,
  } = validatedFields.data;

  try {
    const result = await db.$transaction(async (tx) => {
      const existingReserve = await tx.reserve.findUnique({
        where: { id: reserveId },
      });

      if (!existingReserve) {
        return { error: "Reserve not found!" };
      }

      // si las cantidades de la reserva son distintas a la hora de hacer cambios
      if (existingReserve.reserveQuantity !== reserveQuantity) {
        const quantityDifference =
          reserveQuantity - existingReserve.reserveQuantity;

        await tx.project.update({
          where: { id: projectId },
          data: {
            volume: { decrement: quantityDifference },
          },
        });
      }
      const updateReserve = await tx.reserve.update({
        where: { id: reserveId },
        data: {
          salesTeam,
          reserveOwner,
          reserveQuantity,
          reservePrice,
          status,
          expirationDate,
          reserveComments,
          // Actualiza las relaciones con los modelos
          client: { connect: { id: client } },
          project: { connect: { id: project } },
        },
      });
      return updateReserve;
    });

    return { success: "Reserve updated successfully", reserve: result };
  } catch (error) {
    return { error: "Error updating reserve" };
  }
};

export const deleteReserve = async (reserveId: string, projectId: string) => {
  try {
    const result = await db.$transaction(async (tx) => {
      const existingReserve = await tx.reserve.findUnique({
        where: { id: reserveId },
      });
      if (!existingReserve) {
        return { error: "Reserve not found" };
      }
      const { reserveQuantity } = existingReserve;
      // actualizo el proyecto con el volumen de la reserva que se elimina
      await tx.project.update({
        where: { id: projectId },
        data: {
          volume: { increment: reserveQuantity },
        },
      });
      // si va todo bien, borro
      await db.reserve.delete({
        where: { id: reserveId },
      });
      return { success: "Reserve deleted successfully" };
    });
  } catch (error) {
    console.error(error);
    return { error: "Error deleting reserve" };
  }
};
