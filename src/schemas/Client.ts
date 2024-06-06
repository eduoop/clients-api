import { parsePhoneNumberFromString } from "libphonenumber-js";
import z from "zod";
import { cpf } from "cpf-cnpj-validator";
import { MaritalStatus } from "@prisma/client";

const isValidPhoneNumber = (value: string): boolean => {
  const phoneNumber = parsePhoneNumberFromString(value, "BR");
  return phoneNumber !== undefined && phoneNumber.isValid();
};

export const create = z.object({
  cpf: z.string().refine((value) => cpf.isValid(value), {
    message: "CPF inválido",
  }),
  name: z.string(),
  email: z.string().email(),
  maritalStatus: z.nativeEnum(MaritalStatus),
  address: z.object({
    country: z.string().min(4),
    state: z.string().min(3),
    city: z.string().min(1),
    district: z.string().min(1),
    street: z.string().min(4),
    number: z.string().min(1),
  }),
  phones: z
    .array(z.string().refine(isValidPhoneNumber), {
      message: "Telefone inválido",
    })
    .min(1, "Pelo menos um telefone deve ser fornecido"),
});

export type CreateClient = z.infer<typeof create>;

export const update = z.object({
  cpf: z
    .string()
    .refine((value) => cpf.isValid(value), { message: "CPF inválido" })
    .optional(),
  name: z.string().optional(),
  email: z.string().email().optional(),
  maritalStatus: z.nativeEnum(MaritalStatus).optional(),
  address: z
    .object({
      country: z.string().min(4).optional(),
      state: z.string().min(3).optional(),
      city: z.string().min(1).optional(),
      district: z.string().min(1).optional(),
      street: z.string().min(4).optional(),
      number: z.string().min(1).optional(),
    })
    .optional(),
  phones: z
    .array(z.string().refine(isValidPhoneNumber), {
      message: "Telefone inválido",
    })
    .optional(),
});

export type UpdateClient = z.infer<typeof update>;

const ClientSchema = {
  create,
  update,
};

export default ClientSchema;
