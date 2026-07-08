import prisma from "../src/lib/prisma";
import bcrypt from "bcryptjs";

async function main() {
  const users = await Promise.all([
    prisma.user.upsert({
      where: { email: "alice@prisma.io" },
      update: { username: "Alice" },
      create: {
        email: "alice@prisma.io",
        username: "Alice",
        password: bcrypt.hashSync("Password78&"),
        invoice_closing: 15,
      },
    }),
    prisma.user.upsert({
      where: { email: "bob@prisma.io" },
      update: { username: "Bob" },
      create: {
        email: "bob@prisma.io",
        username: "Bob",
        password: bcrypt.hashSync("erdgsd%6RFD"),
        invoice_closing: 20
      },
    }),
  ]);

  console.log(`Seeded ${users.length} users.`);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
