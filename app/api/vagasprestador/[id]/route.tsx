import { NextResponse } from 'next/server';
import prisma from '@lib/prisma';              

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  const { id } = params;

  try {
    await prisma.vaga.delete({
      where: { id }, // ← não converte pra número!
});

    return NextResponse.json({ message: 'Vaga excluída com sucesso!' }, { status: 200 });
  } catch (error) {
    console.error('Erro ao excluir vaga:', error);
    return NextResponse.json({ error: 'Erro ao excluir vaga.' }, { status: 500 });
  }
}
