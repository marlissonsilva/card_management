"use server";

import prisma from "@/src/lib/prisma";

export async function getUser(uuid: string) {
  const user = await prisma.user.findUnique({
    where: {
      uuid: uuid,
    },
  });
  return user;
}
