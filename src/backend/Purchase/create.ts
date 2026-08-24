"use server";
import prisma from "@/src/lib/prisma";
import { getSession } from "../User/session";
import { purchaseSchema } from "./validate/zod";

export interface CreatePurchaseProps {
  amount: number;
  description: string;
  member: string;
  user_uuid?: string;
  date_purchase: Date;
  installments_count: number;
  status?: boolean;
}

export async function createPurchase(
  formData: CreatePurchaseProps,
): Promise<{ success: boolean; message: string }> {
  const validatePurchase = purchaseSchema.safeParse(formData);

  if (!validatePurchase.success) {
    return { success: false, message: "Erro ao registrar compra" };
  }

  try {
    const session = await getSession();
    const secret = process.env.JWT_SECRET;

    if (!session || !secret) {
      throw new Error(!session ? "Erro na sessão!" : "Erro na secret");
    }

    let member = await prisma.member.findFirst({
      where: {
        user_uuid: session.uuid,
        name: formData.member,
      },
    });

    if (!member) {
      member = await prisma.member.create({
        data: {
          name: formData.member,
          user_uuid: session.uuid,
        },
      });
    }

    const installmentsData = [];
    const amountInCents = Math.round(formData.amount);

    if (formData.installments_count > 1) {
      const baseInstallmentCents = Math.floor(
        amountInCents / formData.installments_count,
      );
      const differenceCents =
        amountInCents - baseInstallmentCents * formData.installments_count;

      for (let i = 0; i < formData.installments_count; i++) {
        const installmentDate = new Date(formData.date_purchase);
        installmentDate.setMonth(installmentDate.getMonth() + i);

        const currentAmount =
          i === 0
            ? baseInstallmentCents + differenceCents
            : baseInstallmentCents;

        installmentsData.push({
          installment_number: i + 1,
          value: currentAmount,
          due_date: installmentDate,
          is_paid: false,
        });
      }
    } else {
      installmentsData.push({
        installment_number: 1,
        value: formData.amount,
        due_date: formData.date_purchase,
        is_paid: formData.status || false,
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
      user: {
        connect: { uuid: session.uuid },
      },
      installment: {
        create: installmentsData,
      },
    };

    const response = await prisma.purchase.create({ data });

    if (response.uuid) {
      return {
        success: true,
        message: "Compra e parcelas registradas com sucesso",
      };
    }

    return { success: false, message: "Erro ao registrar compra" };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      message: `Erro ao registrar compra: ${error instanceof Error ? error.message : "Desconhecido"}`,
    };
  }
}
