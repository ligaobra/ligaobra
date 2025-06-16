import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const { email, senha } = await request.json();

  // Validação simples
  if (email === 'admin@ligaobra.com' && senha === '123456') {
    return NextResponse.json({ mensagem: 'Login realizado com sucesso!' }, { status: 200 });
  } else {
    return NextResponse.json({ mensagem: 'Credenciais inválidas.' }, { status: 401 });
  }
}
