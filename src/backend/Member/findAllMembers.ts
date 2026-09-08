"use server";

import prisma from "@/src/lib/prisma";
import { getSession } from "../User/session";
import { revalidatePath } from "next/cache";

export async function findAllMembers() {
  const userUuid = await getSession();

  if (!userUuid?.uuid) return [];

  try {
    const response = await prisma.member.findMany({
      where: {
        user_uuid: userUuid?.uuid,
      },
      orderBy: {
        name: "asc",
      },
    });
    revalidatePath("/dashboard/membros");
    return response;
  } catch (error) {
    console.error(`Erro ao buscar membros, ${error}`);
    return [];
  }
}
