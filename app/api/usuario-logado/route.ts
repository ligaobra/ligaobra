import { NextResponse, NextRequest } from 'next/server';
import fs from 'fs';
import path from 'path';

interface Usuario {
  id: string;
  [key: string]: unknown; // Permite qualquer outro campo extra
}

export async function GET(request: NextRequest) {
  const cookies = request.cookies;

  const isConstrutora = cookies.get('ligalogin_construtora')?.value;
  const isPrestador = cookies.get('ligalogin_prestador')?.value;
  const isTrabalhador = cookies.get('ligalogin_trabalhador')?.value;

  if (isConstrutora) {
    const filePath = path.join(process.cwd(), 'public', 'construtoras.json');
    const data: Usuario[] = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
    const usuario = data.find((item) => item.id === isConstrutora);
    if (usuario) return NextResponse.json(usuario);
  }

  if (isPrestador) {
    const filePath = path.join(process.cwd(), 'public', 'prestadores.json');
    const data: Usuario[] = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
    const usuario = data.find((item) => item.id === isPrestador);
    if (usuario) return NextResponse.json(usuario);
  }

  if (isTrabalhador) {
    const filePath = path.join(process.cwd(), 'public', 'trabalhadores.json');
    const data: Usuario[] = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
    const usuario = data.find((item) => item.id === isTrabalhador);
    if (usuario) return NextResponse.json(usuario);
  }

  return NextResponse.json({ erro: 'Usuário não logado' }, { status: 401 });
}

