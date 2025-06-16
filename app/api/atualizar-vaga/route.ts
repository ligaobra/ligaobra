import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import iconv from 'iconv-lite';

// Caminho do arquivo JSON
const filePath = path.join(process.cwd(), 'app/api/vagas-publicadas/vagas.json');

export async function PUT(request: Request) {
  try {
    // 🔄 Recebe o texto da requisição
    const bodyText = await request.text();
    console.log("📌 Conteúdo recebido (text):", bodyText);

    // 🔄 Converte para UTF-8 com iconv-lite
    const utf8Text = iconv.decode(Buffer.from(bodyText, 'binary'), 'utf-8');
    const body = JSON.parse(utf8Text);

    console.log("🔄 Dados recebidos para atualizar (JSON):", body);

    // Lendo o conteúdo do arquivo JSON com encoding UTF-8
    const fileContent = fs.readFileSync(filePath, { encoding: 'utf-8' });
    const vagas = JSON.parse(fileContent);

    console.log("📂 Vagas carregadas do JSON:", vagas);

    // Localiza o índice da vaga pelo ID
    const index = vagas.findIndex((vaga: any) => vaga.id === body.id);

    if (index === -1) {
      console.error("❌ Vaga não encontrada.");
      return NextResponse.json({ message: 'Vaga não encontrada.' }, { status: 404 });
    }

    // 🔄 Atualiza a vaga com os dados recebidos
    vagas[index] = body;

    // 🔄 Escrevendo o arquivo com encoding correto (UTF-8) e corrigindo caracteres
    const jsonData = JSON.stringify(vagas, null, 2);
    fs.writeFileSync(filePath, iconv.encode(jsonData, 'utf-8'));

    console.log("✅ Vaga atualizada com sucesso!");
    return NextResponse.json({ message: 'Vaga atualizada com sucesso!' }, { status: 200 });
  } catch (error) {
    console.error("🚨 Erro ao atualizar a vaga:", error.message);
    return NextResponse.json({ message: 'Erro ao atualizar a vaga.' }, { status: 500 });
  }
}
