import { NextResponse } from 'next/server';
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

export async function GET() {
  try {
    const filePath = path.join(process.cwd(), 'public', 'vagas-publicadas.json');
    const fileExists = fs.existsSync(filePath);

    if (!fileExists) {
      return NextResponse.json([], { status: 200 });
    }

    const jsonData = fs.readFileSync(filePath, 'utf-8');
    const vagas: Vaga[] = JSON.parse(jsonData);

    return NextResponse.json(vagas);
  } catch (error) {
    console.error('Erro ao ler vagas-publicadas.json:', error);
    return NextResponse.json({ erro: 'Erro ao carregar vagas' }, { status: 500 });
  }
}
