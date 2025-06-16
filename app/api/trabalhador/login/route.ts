import { NextResponse } from 'next/server';
import prisma from '@lib/prisma';

export async function POST(req: Request) {
  try {
    const { cpf, senha } = await req.json();
    const cpfLimpo = cpf.replace(/\D/g, '');

    const trabalhador = await prisma.trabalhador.findFirst({
      where: { cpf: cpfLimpo },

    });

    console.log("CPF digitado:", cpfLimpo);
    console.log("Senha digitada:", senha);
    console.log("Trabalhador encontrado:", trabalhador);
    console.log("Senha cadastrada no banco:", trabalhador?.senha);


    console.log('Senha digitada:', senha);
    console.log('Senha no banco:', trabalhador?.senha);

    if (!trabalhador || trabalhador.senha.trim() !== senha.trim()) {
    return NextResponse.json(
    { error: 'CPF ou senha inválidos' },
    { status: 401 }
  );
}


    return NextResponse.json({
      success: true,
      trabalhador: {
        id: trabalhador.id,
        nome: trabalhador.nome,
      },
    });

  } catch (error) {
    console.error('Erro no login:', error);
    return NextResponse.json(
      { error: 'Erro interno ao processar o login' },
      { status: 500 }




    );
  }
}