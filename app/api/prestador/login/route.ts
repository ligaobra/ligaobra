import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@lib/prisma';       

export async function POST(request: NextRequest) {
  const { cnpj, senha } = await request.json();

  const prestador = await prisma.prestador.findFirst({
    where: { cnpj, senha },
  });

  if (!prestador) {
    return NextResponse.json({ error: 'CNPJ ou senha inválidos' }, { status: 401 });
  }

  const response = NextResponse.json({ ok: true });

  response.cookies.set('ligalogin_prestador', 'true', {
    httpOnly: true,
    path: '/',
    maxAge: 60 * 60 * 24,
  });

  return response;
}

