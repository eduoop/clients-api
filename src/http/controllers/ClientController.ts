import { Request, Response } from "express";
import z from "zod";
import Client from "../services/Client";
import { PrismaClient } from "@prisma/client";
import ClientSchema from "../../schemas/Client";
import { formatCPF } from "../../utils/formateCpf";

const prisma = new PrismaClient();

export default {
  create: async (req: Request, res: Response) => {
    const exitingClient = await prisma.client.findUnique({
      where: {
        cpf: formatCPF(req.body.cpf),
      },
      include: {
        address: true,
        phones: true,
      },
    });

    if (exitingClient) {
      return res.status(409).json({ message: "Client already exists" });
    }

    try {
      const data = ClientSchema.create.parse(req.body);
      const createdClient = await Client.create(data);
      return res.status(201).json(createdClient);
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({
          message: `Dados inválidos (${error.issues.length})`,
          errors: error.issues,
        });
      } else {
        res.status(500).json({ message: "Erro interno do servidor" });
      }
    }
  },

  update: async (req: Request, res: Response) => {
    const cpf = formatCPF(req.params.cpf);

    const existingClient = await prisma.client.findUnique({
      where: {
        cpf: cpf,
      },
      include: {
        address: true,
        phones: true,
      },
    });

    if (!existingClient) {
      return res.status(404).json({ message: "Client not found" });
    }

    try {
      const updateData = ClientSchema.update.parse(req.body);
      const updatedClient = await Client.update({ cpf, ...updateData });
      return res.status(200).json(updatedClient);
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({
          message: `Dados inválidos (${error.issues.length})`,
          errors: error.issues,
        });
      } else {
        res.status(500).json({ message: "Erro interno do servidor" });
      }
    }
  },
};
