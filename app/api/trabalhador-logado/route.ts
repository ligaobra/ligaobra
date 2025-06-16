import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

interface Trabalhador {
  id: string;
  nome: string;
  email: string;
  telefone: string;
  cidade: string;
  estado: string;
  cpfOuCnpj: string;
  senha: string;
}

const filePath = path.join(process.cwd(), 'public', 'trabalhadores.json');

// GET - Retorna o trabalhador logado (exemplo: Jonas da Silva)
export async function GET() {
  try {
    const fileData = fs.readFileSync(filePath, 'utf-8');
    const trabalhadores: Trabalhador[] = JSON.parse(fileData);

    const trabalhadorLogado = trabalhadores.find(
      (t) => t.nome === 'Jonas da Silva'
    );

    if (!trabalhadorLogado) {
      return NextResponse.json(
        { mensagem: 'Trabalhador não encontrado.' },
        { status: 404 }
      );
    }

    return NextResponse.json(trabalhadorLogado, { status: 200 });
  } catch (error) {
    console.error('Erro ao ler o arquivo JSON:', error);
    return NextResponse.json(
      { mensagem: 'Erro ao carregar dados.' },
      { status: 500 }
    );
  }
}

// PUT - Atualiza os dados do trabalhador
export async function PUT(request: Request) {
  try {
    const body: Trabalhador = await request.json();

    const fileData = fs.readFileSync(filePath, 'utf-8');
    const trabalhadores: Trabalhador[] = JSON.parse(fileData);

    const index = trabalhadores.findIndex((t) => t.id === body.id);

    if (index === -1) {
      return NextResponse.json(
        { mensagem: 'Trabalhador não encontrado para atualização.' },
        { status: 404 }
      );
    }

    trabalhadores[index] = body;

    fs.writeFileSync(filePath, JSON.stringify(trabalhadores, null, 2), 'utf-8');

    return NextResponse.json({ mensagem: 'Trabalhador atualizado com sucesso.' }, { status: 200 });
  } catch (error) {
    console.error('Erro ao atualizar trabalhador:', error);
    return NextResponse.json(
      { mensagem: 'Erro ao atualizar trabalhador.' },
      { status: 500 }
    );
  }
}
