import { NextResponse } from 'next/server';
import prisma from '@lib/prisma';       

export async function GET() {
  try {
    const vagas = await prisma.vaga.findMany();
    return NextResponse.json(vagas);
  } catch (error) {
    console.error('Erro ao buscar vagas:', error);
    return NextResponse.json({ error: 'Erro ao buscar vagas.' }, { status: 500 });
  }
}
