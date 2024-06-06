import { PrismaClient } from "@prisma/client";
import { formatPhoneNumber } from "../../utils/formatePhone";
import { CreateClient } from "../../schemas/Client";

interface AddressInput {
  country?: string;
  state?: string;
  city?: string;
  district?: string;
  street?: string;
  number?: string;
}

interface UpdateClientInput {
  id: number;
  address?: AddressInput;
  email?: string;
  maritalStatus?: "SINGLE" | "MARRIED" | "DIVORCED" | "WIDOWED";
  name?: string;
  phones?: string[];
}

const prisma = new PrismaClient();

const create = async ({
  address,
  cpf,
  email,
  maritalStatus,
  name,
  phones,
}: CreateClient) => {
  const client = await prisma.client.create({
    data: {
      cpf,
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
  id,
  address,
  email,
  maritalStatus,
  name,
  phones,
}: UpdateClientInput) => {
  const updatedClient = await prisma.client.update({
    where: {
      id: id,
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

const Client = {
  create,
  update,
};

export default Client;
