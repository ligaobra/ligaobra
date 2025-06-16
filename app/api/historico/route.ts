import { NextResponse } from 'next/server';

export async function GET() {
  const historico = [
    { id: 1, descricao: 'Atualizou perfil', data: '03/05/2025 14:23' },
    { id: 2, descricao: 'Publicou vaga: Encanador', data: '02/05/2025 09:10' },
    { id: 3, descricao: 'Foi indicado por Construtora X', data: '01/05/2025 18:42' },
  ];

  return NextResponse.json(historico);
}

