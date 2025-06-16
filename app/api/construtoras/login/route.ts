import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@lib/prisma';        // ajuste se necessário

export async function POST(request: NextRequest) {
  const { cnpj, senha } = await request.json();

  try {
    const construtora = await prisma.construtora.findFirst({
      where: {
        cnpj,
        senha,
      },
    });

    if (!construtora) {
      return NextResponse.json({ error: 'CNPJ ou senha inválidos' }, { status: 401 });
    }

    const response = NextResponse.json({ ok: true });

    response.cookies.set('ligalogin_construtora', 'true', {
      httpOnly: true,
      path: '/',
      maxAge: 60 * 60 * 24, // 1 dia
    });

    return response;
  } catch (error) {
    console.error('Erro ao fazer login da construtora:', error);
    return NextResponse.json({ error: 'Erro interno no servidor' }, { status: 500 });
  }
}
