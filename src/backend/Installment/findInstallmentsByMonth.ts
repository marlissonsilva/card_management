"use server";

import prisma from "@/src/lib/prisma";
import { getSession } from "../User/session";
import { getMonthDate } from "../utils/date";

export async function findInstallmentsByMonth(
  month: number,
) {
  const userUuid = await getSession();
  if (!userUuid?.uuid) return { success: false, data: [], totalAmount: 0 };

  const user = await prisma.user.findUnique({
    where: {
      uuid: userUuid?.uuid,
    },
  });

  if (!user) {
    throw new Error("Erro ao buscar usuário");
  }

  const dates = getMonthDate(user.invoice_closing, month);

  try {
    const response = await prisma.installment.findMany({
      where: {
        due_date: {
          gte: dates.startDate,
          lte: dates.endDate,
        },
        purchase: {
          user_uuid: userUuid.uuid,
        },
      },
      include: {
        purchase: {
          select: {
            description: true,
            installments_count: true,
            date_purchase: true,
            member: {
              select: { name: true },
            },
          },
        },
      },
    });

    const totalInvoiceAmount = response.reduce(
      (acc, curr) => acc + curr.value,
      0,
    );
    return {
      success: true,
      data: response || [],
      totalAmount: totalInvoiceAmount,
    };
  } catch (error) {
    console.error("Erro ao buscar fatura:", error);
    return { success: false, data: [], totalAmount: 0 };
  }
}
