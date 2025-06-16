import { NextResponse, NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const url = request.nextUrl.pathname;

  const isConstrutora = request.cookies.get('ligalogin_construtora')?.value;
  const isPrestador = request.cookies.get('ligalogin_prestador')?.value;
  const isTrabalhador = request.cookies.get('ligalogin_trabalhador')?.value;

  // Protegendo o painel da Construtora
  if (url.startsWith('/painel/construtora') && !isConstrutora) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // Protegendo o painel do Prestador
  if (url.startsWith('/painel/prestador') && !isPrestador) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // Protegendo o painel do Trabalhador
  if (url.startsWith('/painel/trabalhador') && !isTrabalhador) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // Protegendo o painel de vagas internas (só Construtora ou Prestador podem acessar)
  if (url.startsWith('/painel/vagas') && !isConstrutora && !isPrestador) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // Protegendo o Painel de Histórico (admin ou quem você quiser permitir)
  if (url.startsWith('/painel/historico') && !isConstrutora && !isPrestador) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // Protegendo o Painel de Candidatos
  if (url.startsWith('/painel/candidatos') && !isConstrutora && !isPrestador) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // Protegendo o Painel Administrativo (exemplo: só Construtora logada pode acessar)
  if (url.startsWith('/painel/admin') && !isConstrutora) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  return NextResponse.next();
}
