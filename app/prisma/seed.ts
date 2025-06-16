import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  await prisma.vaga.create({
    data: {
      titulo: "Engenheiro de Software",
      descricao: "Desenvolvimento de aplicações web.",
      cidade: "Curitiba",
      estado: "PR",
      tipoContrato: "CLT",
      faixaSalarial: "R$ 10.000 - R$ 15.000",
      inicioPrevisto: "Imediato",
    },
  });

  console.log("Vaga criada com sucesso!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });


