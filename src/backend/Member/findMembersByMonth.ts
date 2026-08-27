"use server";

import prisma from "@/src/lib/prisma";
import { getSession } from "../User/session";
import { getMonthDate } from "../utils/date";
import { getUser } from "../User/getUser";

export async function findMembersByMonth(month: number) {
  const userUuid = await getSession();

  if (!userUuid?.uuid) return [];

  const user = await getUser(userUuid.uuid);

  if (!user) {
    throw new Error("Erro ao buscar usuário");
  }

  const dates = getMonthDate(user.invoice_closing, month);

  try {
    const response = await prisma.member.findMany({
      where: {
        user_uuid: userUuid?.uuid,
        purchases: {
          some: {
            installment: {
              some: {
                due_date: {
                  gte: dates.startDate,
                  lte: dates.endDate,
                },
              },
            },
          },
        },
      },
      select: {
        uuid: true,
        name: true,
        purchases: {
          select: {
            installment: {
              where: {
                due_date: {
                  gte: dates.startDate,
                  lte: dates.endDate,
                },
              },
              select: {
                value: true,
              },
            },
          },
        },
      },
      orderBy: {
        name: "asc",
      },
    });

    return response.map((member) => {
      const totalAmountPurchases = member.purchases.reduce((acc, purchase) => {
        const sumOfInstallments = purchase.installment.reduce(
          (instAcc, installment) => instAcc + installment.value,
          0,
        );
        return acc + sumOfInstallments;
      }, 0);

      const { ...memberData } = member;
      return {
        ...memberData,
        totalAmountPurchases,
        invloceClosing: user.invoice_closing,
      };
    });
  } catch (error) {
    console.error(`Erro ao buscar membros, ${error}`);
    return [];
  }
}
