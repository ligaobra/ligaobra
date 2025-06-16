import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const filePath = path.join(process.cwd(), 'data', 'vagas.json');

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  const id = params.id;

  try {
    // Ler o arquivo JSON
    const data = fs.readFileSync(filePath, 'utf-8');
    const vagas = JSON.parse(data);

    // Filtrar para remover a vaga pelo ID
    const novasVagas = vagas.filter((vaga: any) => vaga.id !== id);

    if (novasVagas.length === vagas.length) {
      console.log(`❌ Vaga com ID ${id} não encontrada.`);
      return NextResponse.json({ error: 'Vaga não encontrada.' }, { status: 404 });
    }

    // Salvar no arquivo JSON
    fs.writeFileSync(filePath, JSON.stringify(novasVagas, null, 2), 'utf-8');

    console.log(`✅ Vaga ${id} removida com sucesso!`);
    return NextResponse.json({ message: 'Vaga removida com sucesso.' }, { status: 200 });

  } catch (error) {
    console.error('❌ Erro ao deletar a vaga:', error.message);
    return NextResponse.json({ error: 'Erro ao deletar a vaga.' }, { status: 500 });
  }
}
