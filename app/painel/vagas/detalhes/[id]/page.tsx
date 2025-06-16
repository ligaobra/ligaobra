'use client';

import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';

interface Vaga {
  id: string;
  titulo: string;
  descricao: string;
  cidade: string;
  estado: string;
  tipoContrato: string;
  faixaSalarial: string;
  inicioPrevisto: string;
  whatsapp?: string;
  nomeEmpresa?: string;
  instagram?: string;
  site?: string;
  email?: string;
  indicadoPor?: string;
}

export default function DetalhesVaga() {
  const { id } = useParams();
  const router = useRouter();
  const [vaga, setVaga] = useState<Vaga | null>(null);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    const carregarVaga = async () => {
      try {
        const resposta = await fetch(`/api/vagas-publicadas/${id}`);
        if (!resposta.ok) throw new Error('Erro ao buscar vaga');
        const dados = await resposta.json();
        setVaga(dados);
      } catch (erro) {
        console.error('Erro ao carregar vaga:', erro);
      } finally {
        setCarregando(false);
      }
    };

    carregarVaga();
  }, [id]);

  if (carregando) return <p>Carregando vaga...</p>;
  if (!vaga) return <p>Vaga não encontrada.</p>;

  return (
  <div className="p-6 max-w-3xl mx-auto bg-white rounded-xl shadow-md space-y-4">
    <h1 className="text-3xl font-bold text-gray-800">{vaga.titulo}</h1>
    <p><span className="font-semibold">Descrição:</span></p>
    <p><span className="font-semibold">Local:</span> {vaga.cidade} - {vaga.estado}</p>
    <p><span className="font-semibold">Tipo de contrato:</span> {vaga.tipoContrato}</p>
    <p><span className="font-semibold">Faixa salarial:</span> {vaga.faixaSalarial}</p>
    <p><span className="font-semibold">Início previsto:</span> {vaga.inicioPrevisto}</p>

    {vaga.nomeEmpresa && (
  <p><span className="font-semibold">Empresa:</span> {vaga.nomeEmpresa}</p>
)}

{vaga.instagram && (
  <p>
    <span className="font-semibold">Instagram:</span>{' '}
    <a
      href={`https://instagram.com/${vaga.instagram.replace('@', '')}`}
      target="_blank"
      rel="noopener noreferrer"
      className="text-blue-600 hover:underline"
    >
      {vaga.instagram}
    </a>
  </p>
)}

{vaga.site && (
  <p>
    <span className="font-semibold">Site:</span>{' '}
    <a
      href={vaga.site}
      target="_blank"
      rel="noopener noreferrer"
      className="text-blue-600 hover:underline"
    >
      {vaga.site}
    </a>
  </p>
)}

{vaga.email && (
  <p>
    <span className="font-semibold">E-mail:</span>{' '}
    <a
      href={`mailto:${vaga.email}`}
      className="text-blue-600 hover:underline"
    >
      {vaga.email}
    </a>
  </p>
)}

{vaga.indicadoPor && (
  <p>
    <span className="font-semibold">Indicado por:</span> {vaga.indicadoPor}
  </p>
)}



    <div className="flex flex-wrap gap-4 mt-6">
      <button
        onClick={() => router.push('/painel/vagas/listar')}
        className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
      >
        Voltar para Listagem
      </button>

      <button
        onClick={() => router.push(`/painel/vagas/editar/${vaga.id}`)}
        className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600"
      >
        Editar Vaga
      </button>

      <a
        href={`https://wa.me/5599999999999?text=Olá! Tenho interesse na vaga de ${vaga.titulo} publicada na plataforma LigaObra.`}
        target="_blank"
        rel="noopener noreferrer"
        className="px-4 py-2 bg-emerald-600 text-white rounded hover:bg-emerald-700"
      >
        Candidatar-se via WhatsApp
      </a>
    </div>
  </div>
);
}
