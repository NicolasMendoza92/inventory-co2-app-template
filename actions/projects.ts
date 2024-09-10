import { ProjectSchema } from "@/schemas";
import { z } from "zod";
import { db } from "@/lib/db";


export const createProject = async (values: z.infer<typeof ProjectSchema>) => {
  const validatedFields = ProjectSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid fields!" };
  }

  const {
    projectID,
    standard,
    projectName,
    vintage,
    volume,
    tech,
    hostCountry,
    continent,
    corsia,
    ccb,
    ccp,
    projectType,
    sdg,
    sdgSelected,
    sdgImages,
    mktDate,
    projectOwner,
    sellPrice,
    sellCorpPrice,
    floorPrice,
    purchasePrice,
    projectLink,
    availability,
    stock,
    notes,
    files,
    dynamicFields,
  } = validatedFields.data;

  try {
    const project = await db.project.create({
      data: {
        projectID,
        standard,
        projectName,
        vintage,
        volume,
        tech,
        hostCountry,
        continent,
        corsia,
        ccb,
        ccp,
        projectType,
        sdg,
        sdgSelected,
        sdgImages,
        mktDate,
        projectOwner,
        sellPrice,
        sellCorpPrice,
        floorPrice,
        purchasePrice,
        projectLink,
        availability,
        stock,
        notes,
        files,
        dynamicFields
      },
    });

    return { success: "Project created successfully", project };
  } catch (error) {
    return { error: "Error creating project" };
  }
};


export const getProjectById = async (projectId: string) => {
  try {
    const project = await db.project.findUnique({
      where: { id: projectId },
    });

    if (!project) {
      return { error: "Project not found" };
    }

    return { project };
  } catch (error) {
    return { error: "Error fetching project" };
  }
};


export const updateProject = async (projectId: string, values: z.infer<typeof ProjectSchema>) => {
  const validatedFields = ProjectSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid fields!" };
  }

  try {
    const project = await db.project.update({
      where: { id: projectId },
      data: {
        ...validatedFields.data,
      },
    });

    return { success: "Project updated successfully", project };
  } catch (error) {
    return { error: "Error updating project" };
  }
};


export const deleteProject = async (projectId: string) => {
  try {
    await db.project.delete({
      where: { id: projectId },
    });

    return { success: "Project deleted successfully" };
  } catch (error) {
    return { error: "Error deleting project" };
  }
};