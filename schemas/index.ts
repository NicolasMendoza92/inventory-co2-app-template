import { newPassword } from "@/actions/new-password";
import { UserRole } from "@prisma/client";
import * as z from "zod";

export const LoginSchema = z.object({
  email: z.string().email({
    message: "email is required",
  }),
  password: z.string().min(1, {
    message: "Password is required",
  }),
  code: z.optional(z.string()),
});

export const RegisterSchema = z.object({
  email: z.string().email({
    message: "email is required",
  }),
  password: z.string().min(6, {
    message: "Minimum 6 characters required",
  }),
  name: z.string().min(1, {
    message: "Name is required",
  }),
});

export const ResetSchema = z.object({
  email: z.string().email({
    message: "email is required",
  }),
});

export const NewPasswordSchema = z.object({
  password: z.string().min(6, {
    message: "Minimum of 6 characters",
  }),
});

export const SettingsSchema = z
  .object({
    name: z.optional(z.string()),
    isTwoFactorEnabled: z.optional(z.boolean()),
    role: z.enum([UserRole.ADMIN, UserRole.USER]),
    email: z.optional(z.string().email()),
    password: z.optional(z.string().min(6)),
    newPassword: z.optional(z.string().min(6)),
  })
  .refine(
    (data) => {
      if (data.password && !data.newPassword) {
        return false;
      }
      return true;
    },
    {
      message: "New password is required",
      path: ["newPassword"],
    }
  )
  .refine(
    (data) => {
      if (data.newPassword && !data.password) {
        return false;
      }
      return true;
    },
    {
      message: "Password is required",
      path: ["password"],
    }
  );

const DynamicFieldsSchema = z.object({
  extraField1: z.string().optional(),
  extraField2: z.string().optional(),
  extraField3: z.string().optional(),
});

export const ProjectSchema = z.object({
  projectID: z.string().min(1, {
    message: "Project ID is required",
  }),
  standard: z.string().min(1, {
    message: "Standard is required",
  }),
  projectName: z.string().min(1, {
    message: "Project Name is required",
  }),
  vintage: z.string().min(1, {
    message: "Vintage is required",
  }),
  volume: z.number().min(1, {
    message: "Volume must be greater than 0",
  }),
  tech: z.string().min(1, {
    message: "Technology is required",
  }),
  hostCountry: z.string().min(1, {
    message: "Country is required",
  }),
  continent: z.string().optional(),
  corsia: z.string().optional(),
  ccb: z.string().optional(),
  ccp: z.string().optional(),
  projectType: z.string().optional(),
  sdg: z.string().optional(),
  sdgSelected: z.array(z.string()).optional(),
  sdgImages: z.array(z.string()).optional(),
  mktDate: z.date().optional(),
  projectOwner: z.string().optional(),
  sellPrice: z.number().optional(),
  sellCorpPrice: z.number().optional(),
  floorPrice: z.number().optional(),
  purchasePrice: z.number().optional(),
  projectLink: z.string().optional(),
  availability: z.string().optional(),
  stock: z.string().optional(),
  notes: z.string().optional(),
  files: z.array(z.string()).optional(),
  dynamicFields: DynamicFieldsSchema.optional(),
});

export const OperationSchema = z.object({
  transactionType: z.string().min(1, {
    message: "Type is required",
  }),
  salesTeam: z.string().min(1, {
    message: "Team is required",
  }),
  client: z.string().min(1, {
    message: "Client Name is required",
  }),
  project: z.string().min(1, {
    message: "Project is required",
  }),
  user: z.string().min(1, {
    message: "Project is required",
  }),
  quantity: z.number().min(1, {
    message: "Volume must be greater than 0",
  }),
  sellPrice: z.number().optional(),
  purchasePrice: z.number().optional(),
  deliveryStatus: z.string().optional(),
  deliveryDate: z.string().optional().transform((value) => (value ? new Date(value) : null)),
  paymentStatus: z.string().optional(),
  paymentDate: z.string().optional().transform((value) => (value ? new Date(value) : null)),
  internalNotes: z.string().optional(),
  files: z.array(z.string()).optional(),
  dynamicFields: DynamicFieldsSchema.optional(),
});

export const ReserveSchema = z.object({
  salesTeam: z.string().min(1, {
    message: "Team is required",
  }),
  client: z.string().min(1, {
    message: "Client Name is required",
  }),
  project: z.string().min(1, {
    message: "Project is required",
  }),
  reserveOwner: z.string().min(1, {
    message: "Project is required",
  }),
  reserveQuantity: z.number().min(1, {
    message: "Volume must be greater than 0",
  }),
  reservePrice: z.number().optional(),
  status: z.string().optional(),
  expirationDate: z.date().optional(),
  reserveComments: z.string().optional(),
});

