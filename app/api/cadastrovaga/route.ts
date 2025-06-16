import { NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';

const vagasPath = path.resolve(process.cwd(), 'data/vagas.json');
const historicoPath = path.resolve(process.cwd(), 'data/historico.json');

interface Vaga {
  id: number;
  titulo: string;
  cidade: string;
  estado: string;
  tipoContrato: string;
  faixaSalarial?: string;
  inicioPrevisto?: string;
}

interface Acao {
  id: number;
  descricao: string;
  data: string;
}

export async function POST(request: Request) {
  const novaVaga: Vaga = await request.json();

  // 📁 Lê vagas existentes
  const vagasTexto = await fs.readFile(vagasPath, 'utf8');
  const vagas: Vaga[] = JSON.parse(vagasTexto);

  // Adiciona nova vaga com data atual
  const vagaComId = { ...novaVaga, id: Date.now() };
  vagas.push(vagaComId);

  // Salva no arquivo
  await fs.writeFile(vagasPath, JSON.stringify(vagas, null, 2));

  // 🕓 Registra no histórico
  const historicoTexto = await fs.readFile(historicoPath, 'utf8');
  const historico: Acao[] = JSON.parse(historicoTexto);

  const novaAcao: Acao = {
    id: Date.now(),
    descricao: `Publicou vaga: ${novaVaga.titulo}`,
    data: new Date().toLocaleString('pt-BR'),
  };

  historico.push(novaAcao);
  await fs.writeFile(historicoPath, JSON.stringify(historico, null, 2));

  return NextResponse.json({
    message: 'Vaga cadastrada com sucesso!',
    vaga: vagaComId,
  });
}

export async function GET() {
  const vagasTexto = await fs.readFile(vagasPath, 'utf8');
  const vagas: Vaga[] = JSON.parse(vagasTexto);
  return NextResponse.json(vagas);
}

