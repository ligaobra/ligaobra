import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();


async function main() {
  console.log('Limpando registros...');
  await prisma.$executeRawUnsafe(`DELETE FROM Trabalhador`);
  console.log('Todos os trabalhadores foram apagados.');
}

main()
  .then(() => prisma.$disconnect())
  .catch((e) => {
    console.error(e);
    prisma.$disconnect();
    process.exit(1);
  });
