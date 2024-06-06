import { PrismaClient } from "@prisma/client";
import { formatPhoneNumber } from "../../utils/formatePhone";
import { CreateClient } from "../../schemas/Client";
import { formatCPF } from "../../utils/formateCpf";

interface AddressInput {
  country?: string;
  state?: string;
  city?: string;
  district?: string;
  street?: string;
  number?: string;
}

interface UpdateClientInput {
  cpf: string;
  address?: AddressInput;
  email?: string;
  maritalStatus?: "SINGLE" | "MARRIED" | "DIVORCED" | "WIDOWED";
  name?: string;
  phones?: string[];
}

export interface IndexClients
  extends Pick<UpdateClientInput, "name" | "cpf" | "email" | "maritalStatus"> {}

const prisma = new PrismaClient();

const create = async ({
  address,
  cpf,
  email,
  maritalStatus,
  name,
  phones,
}: CreateClient) => {
  const formateCpf = formatCPF(cpf);

  const client = await prisma.client.create({
    data: {
      cpf: formateCpf,
      email,
      maritalStatus,
      name,
      address: {
        create: {
          country: address.country,
          state: address.state,
          city: address.city,
          district: address.district,
          street: address.street,
          number: address.number,
        },
      },
      phones: {
        createMany: {
          data: phones.map((phone) => ({ number: formatPhoneNumber(phone) })),
        },
      },
    },
  });
  return client;
};

const update = async ({
  cpf,
  address,
  email,
  maritalStatus,
  name,
  phones,
}: UpdateClientInput) => {
  const updatedClient = await prisma.client.update({
    where: {
      cpf: cpf,
    },
    data: {
      email: email,
      maritalStatus: maritalStatus,
      name: name,
      address: {
        update: {
          country: address?.country,
          state: address?.state,
          city: address?.city,
          district: address?.district,
          street: address?.street,
          number: address?.number,
        },
      },
      phones: {
        deleteMany: {},
        createMany: {
          data:
            phones?.map((phone) => ({
              number: formatPhoneNumber(phone ?? ""),
            })) ?? [],
        },
      },
    },
  });
  return updatedClient;
};

const index = async ({ cpf, email, maritalStatus, name }: IndexClients) => {
  const where: any = {};

  if (name) where.name = { contains: name };
  if (cpf) where.cpf = formatCPF(cpf);
  if (email) where.email = email;
  if (maritalStatus) where.maritalStatus = maritalStatus;

  const clients = await prisma.client.findMany({ where });

  return clients;
};

const Client = {
  create,
  update,
  index,
};

export default Client;
