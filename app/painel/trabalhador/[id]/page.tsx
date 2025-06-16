import { prisma } from '@lib/prisma';
import { notFound } from 'next/navigation';

interface Props {
  params: {
    id: string;
  };
}

export default async function PainelTrabalhador({ params }: Props) {
  const trabalhador = await prisma.trabalhador.findUnique({
    where: {
      id: Number(params.id),
    },
  });

  if (!trabalhador) {
    notFound(); // Retorna página 404 caso o ID não exista
  }

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold text-green-700 mb-4">
        Bem-vindo, {trabalhador.nome}!
      </h1>

      <div className="bg-white shadow p-4 rounded border border-gray-200">
        <p><strong>ID:</strong> {trabalhador.id}</p>
        <p><strong>Nome:</strong> {trabalhador.nome}</p>
        <p><strong>CPF:</strong> {trabalhador.cpf}</p>
        <p><strong>Profissão:</strong> {trabalhador.profissao}</p>
        <p><strong>Cidade:</strong> {trabalhador.cidade} - {trabalhador.estado}</p>
        <p><strong>Telefone:</strong> {trabalhador.telefone}</p>
        <p><strong>Email:</strong> {trabalhador.email}</p>
      </div>
    </div>
  );
}
