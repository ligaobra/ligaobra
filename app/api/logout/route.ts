import { NextResponse } from 'next/server';

export async function GET() {
  const response = NextResponse.redirect(new URL('/login', process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'));

  response.cookies.delete('ligalogin_construtora');
  response.cookies.delete('ligalogin_prestador');
  response.cookies.delete('ligalogin_trabalhador');

  return response;
}
