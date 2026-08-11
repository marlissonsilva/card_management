"use server";

import prisma from "@/src/lib/prisma";
import { getSession } from "../User/session";

export async function findAllMembers() {
  const userUuid = await getSession();

  if (!userUuid?.uuid) return [];

  const response = await prisma.member.findMany({
    where: {
      user_uuid: userUuid?.uuid,
    },
    include: {
      purchases: {
        where: {
          user_uuid: userUuid.uuid,
        },
        select: {
          amount: true,
        },
      },
    },
  });

  return response.map((member) => {
    const totalAmountPurchases = member.purchases.reduce(
      (acc, purchase) => acc + (purchase.amount || 0),
      0,
    );

    const { ...memberData } = member;
    return {
      ...memberData,
      totalAmountPurchases,
    };
  });
}
