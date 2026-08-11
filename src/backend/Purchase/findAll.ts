"use server";

import prisma from "@/src/lib/prisma";
import { getSession } from "../User/session";

export async function findAllPurchases() {
  const userUuid = await getSession();

  if(!userUuid?.uuid) return []

  const response = await prisma.purchase.findMany({
    where: {
      user_uuid: userUuid?.uuid,
    },
    orderBy: {
      date_purchase: "asc"
    },
    include:{
      member: {
        select: {
          name: true
        }
      }
    }
  });
  return response;
}
