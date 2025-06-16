import { NextResponse } from 'next/server';
import { writeFile, readFile } from 'fs/promises';
import path from 'path';

const filePath = path.resolve(process.cwd(), 'public', 'trabalhadores.json');

export async function POST(req: Request) {
  try {
    const novoTrabalhador = await req.json();

    const fileData = await readFile(filePath, 'utf-8');
    const trabalhadores = JSON.parse(fileData);

    trabalhadores.push(novoTrabalhador);

    await writeFile(filePath, JSON.stringify(trabalhadores, null, 2), 'utf-8');

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Erro ao salvar trabalhador:', error);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}
