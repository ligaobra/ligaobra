import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const { email, senha } = await req.json();

    const usuario = await prisma.usuario.findUnique({
      where: { email },
    });

    if (!usuario || usuario.senha !== senha) {
      return NextResponse.json({ error: 'Usuário ou senha inválidos.' }, { status: 401 });
    }

    return NextResponse.json({ message: 'Login bem-sucedido!' });
  } catch (error) {
    console.error('Erro no login:', error);
    return NextResponse.json({ error: 'Erro no login.' }, { status: 500 });
  }
}

