import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@lib/prisma';       

// Buscar vaga por ID
export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const vaga = await prisma.vaga.findUnique({
      where: { id: params.id },
    });

    if (!vaga) {
      return NextResponse.json({ error: 'Vaga não encontrada' }, { status: 404 });
    }

    return NextResponse.json(vaga);
  } catch (error) {
    console.error('Erro ao buscar vaga:', error);
    return NextResponse.json({ error: 'Erro interno' }, { status: 500 });
  }
}

// Atualizar vaga por ID
export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const body = await request.json();

    const vagaAtualizada = await prisma.vaga.update({
      where: { id: params.id },
      data: {
        titulo: body.titulo,
        descricao: body.descricao,
        cidade: body.cidade,
        estado: body.estado,
      },
    });

    return NextResponse.json(vagaAtualizada);
  } catch (error) {
    console.error('Erro ao atualizar vaga:', error);
    return NextResponse.json({ error: 'Erro ao atualizar' }, { status: 500 });
  }
}
