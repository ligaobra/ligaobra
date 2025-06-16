import { NextResponse } from 'next/server';
import prisma from '../../../lib/prisma';

export async function POST(req: Request) {
  const data = await req.json();

  const novaConstrutora = await prisma.construtora.create({
    data: {
      nome: data.nome || "",
      segmento: data.segmento || "",
      cnpj: data.cnpj || "",
      cidade: data.cidade || "",
      estado: data.estado || "",
      site: data.site || "",
      instagram: data.instagram || "",
      whatsapp: data.whatsapp || "",
    },
  });

  return NextResponse.json(novaConstrutora);
}
