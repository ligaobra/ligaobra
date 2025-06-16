import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const filePath = path.join(process.cwd(), 'data', 'vagas.json');

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  const id = params.id;

  try {
    // Ler o arquivo JSON
    const data = fs.readFileSync(filePath, 'utf-8');
    const vagas = JSON.parse(data);

    // Encontrar o índice da vaga
    const index = vagas.findIndex((vaga: any) => vaga.id === id);

    if (index === -1) {
      return NextResponse.json({ error: 'Vaga não encontrada.' }, { status: 404 });
    }

    // Receber os dados da requisição
    const updatedVaga = await req.json();

    // Atualizar os dados da vaga no array
    vagas[index] = { ...vagas[index], ...updatedVaga };

    // Salvar no arquivo JSON
    fs.writeFileSync(filePath, JSON.stringify(vagas, null, 2), 'utf-8');

    console.log(`✅ Vaga ${id} atualizada com sucesso!`);
    return NextResponse.json({ message: 'Vaga atualizada com sucesso.' }, { status: 200 });

  } catch (error) {
    console.error('❌ Erro ao atualizar a vaga:', error.message);
    return NextResponse.json({ error: 'Erro ao atualizar a vaga.' }, { status: 500 });
  }
}
