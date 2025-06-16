import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// ➡️ Criar uma nova vaga
export const criarVaga = async (dados: {
  titulo: string;
  descricao: string;
  cidade: string;
  estado: string;
  tipoContrato: string;
  faixaSalarial: string;
  inicioPrevisto: string;
}) => {
  const vaga = await prisma.vaga.create({
    data: dados,
  });
  console.log("Vaga criada com sucesso:", vaga);
  return vaga;
};

// ➡️ Listar todas as vagas
export const listarVagas = async () => {
  const vagas = await prisma.vaga.findMany();
  console.log("Vagas encontradas:", vagas);
  return vagas;
};

// ➡️ Atualizar uma vaga
export const atualizarVaga = async (id: number, dados: Partial<typeof dados>) => {
  const vaga = await prisma.vaga.update({
    where: { id },
    data: dados,
  });
  console.log("Vaga atualizada com sucesso:", vaga);
  return vaga;
};

// ➡️ Deletar uma vaga
export const deletarVaga = async (id: number) => {
  await prisma.vaga.delete({
    where: { id },
  });
  console.log(`Vaga com ID ${id} foi deletada.`);
};
