import { NextResponse, NextRequest } from 'next/server';
import fs from 'fs';
import path from 'path';

interface Vaga {
  id: string;
  titulo: string;
  descricao: string;
  cidade: string;
  estado: string;
  salario: string;
}

export async function GET(request: NextRequest, context: { params: { id: string } }) {
  const { id } = context.params;

  try {
    const filePath = path.join(process.cwd(), 'public', 'vagas-publicadas.json');
    const jsonData = fs.readFileSync(filePath, 'utf-8');
    const vagas: Vaga[] = JSON.parse(jsonData);

    const vaga = vagas.find((item) => item.id === id);

    if (vaga) {
      return NextResponse.json(vaga);
    } else {
      return NextResponse.json({ erro: 'Vaga não encontrada' }, { status: 404 });
    }
  } catch (error) {
    console.error('Erro ao ler vagas-publicadas.json:', error);
    return NextResponse.json({ erro: 'Erro ao carregar a vaga' }, { status: 500 });
  }
}
