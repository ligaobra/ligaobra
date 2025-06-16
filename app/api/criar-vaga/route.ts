import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const filePath = path.join(process.cwd(), 'data', 'vagas.json');

export async function POST(req: Request) {
  try {
    const novaVaga = await req.json();

    // Ler o arquivo JSON
    const data = fs.readFileSync(filePath, 'utf-8');
    const vagas = JSON.parse(data);

    // Adicionar a nova vaga no array
    vagas.push(novaVaga);

    // Salvar no arquivo JSON
    fs.writeFileSync(filePath, JSON.stringify(vagas, null, 2), 'utf-8');

    console.log(`✅ Vaga ${novaVaga.id} criada com sucesso!`);
    return NextResponse.json({ message: 'Vaga criada com sucesso.' }, { status: 201 });

  } catch (error) {
    console.error('❌ Erro ao criar a vaga:', error.message);
    return NextResponse.json({ error: 'Erro ao criar a vaga.' }, { status: 500 });
  }
}
