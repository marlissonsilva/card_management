"use server";
import prisma from "@/src/lib/prisma";
import { getSession } from "../User/session";

export interface CreatePurchaseProps {
  amount: number;
  description: string;
  member: string;
  date_purchase: Date;
  installments_count: number;
}

export async function createPurchase(
  formData: CreatePurchaseProps,
): Promise<{ success: boolean; message: string }> {
  try {
    const session = await getSession();
    const secret = process.env.JWT_SECRET;
   
    if (!session) {
      throw new Error("Erro na sessão!");
    }

    if (!secret) {
      throw new Error("Erro na secret");
    }

    // TODO: Criar funções do Member (create, update, findFirst, findUnique, delete)
    let member = await prisma.member.findFirst({
      where: { name: formData.member },
    });
    if (!member) {
      member = await prisma.member.create({
        data: {
          name: formData.member,
          user_uuid: session?.uuid,
        },
      });
    }

    const data = {
      amount: formData.amount,
      description: formData.description,
      date_purchase: formData.date_purchase,
      installments_count: formData.installments_count,
      member: {
        connect: { uuid: member.uuid },
      },
    };

    const response = await prisma.purchase.create({ data });
    if (response.uuid) {
      return { success: true, message: "Compra registrada com sucesso" };
    }
    return { success: false, message: "Errro ao registrar compra" };
  } catch (error) {
    console.log(error);
    return { success: false, message: `Errro ao registrar compra, ${error}` };
  }
}
