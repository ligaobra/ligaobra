import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const { nome, email, senha } = await req.json();

    const usuarioExistente = await prisma.usuario.findUnique({
      where: { email },
    });

    if (usuarioExistente) {
      return NextResponse.json({ error: 'Usuário já cadastrado.' }, { status: 400 });
    }

    const novoUsuario = await prisma.usuario.create({
      data: { nome, email, senha },
    });

    return NextResponse.json(novoUsuario);
  } catch (error) {
    console.error('Erro ao cadastrar usuário:', error);
    return NextResponse.json({ error: 'Erro ao cadastrar usuário.' }, { status: 500 });
  }
}

