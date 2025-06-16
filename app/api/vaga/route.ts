import { NextResponse } from 'next/server';
import prisma from '@lib/prisma';        

// Criar nova vaga
export async function POST(req: Request) {
  const data = await req.json();

  const novaVaga = await prisma.vaga.create({
    data: {
      titulo: data.titulo,
      descricao: data.descricao,
      cidade: data.cidade,
      estado: data.estado,
      tipoContrato: data.tipoContrato,
      faixaSalarial: data.faixaSalarial,
      inicioPrevisto: data.inicioPrevisto,
    },
  });

  return NextResponse.json(novaVaga);
}

// Listar todas as vagas
export async function GET() {
  try {
    const vagas = await prisma.vaga.findMany({
      orderBy: { createdAt: 'desc' }, // Opcional: mais recentes primeiro
    });

    return NextResponse.json(vagas);
  } catch (error) {
    console.error('Erro ao listar vagas:', error);
    return NextResponse.json({ error: 'Erro ao buscar vagas' }, { status: 500 });
  }
}
