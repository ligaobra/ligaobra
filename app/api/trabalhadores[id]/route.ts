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
}

const filePath = path.join(process.cwd(), 'public', 'trabalhadores.json');

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  const id = params.id;

  try {
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    const trabalhadores: Trabalhador[] = JSON.parse(fileContent);

    const index = trabalhadores.findIndex((t) => t.id === id);

    if (index === -1) {
      return NextResponse.json({ error: 'Trabalhador não encontrado.' }, { status: 404 });
    }

    const body = await request.json();

    // Atualiza apenas os campos recebidos
    trabalhadores[index] = { ...trabalhadores[index], ...body };

    fs.writeFileSync(filePath, JSON.stringify(trabalhadores, null, 2));

    return NextResponse.json({ message: 'Trabalhador atualizado com sucesso.' });
  } catch (error) {
    console.error('Erro ao atualizar trabalhador:', error);
    return NextResponse.json({ error: 'Erro interno ao atualizar.' }, { status: 500 });
  }
}
