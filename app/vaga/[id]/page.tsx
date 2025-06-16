"use client";

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

interface Vaga {
  id: number;
  titulo: string;
  descricao: string;
  cidade: string;
  estado: string;
  tipoContrato: string;
  faixaSalarial: string;
  inicioPrevisto: string;
}

export default function DetalhesVagaPage() {
  const router = useRouter();
  const [vaga, setVaga] = useState<Vaga | null>(null);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    const id = window.location.pathname.split("/").pop();
    const fetchVaga = async () => {
      try {
        const response = await fetch(`/api/vagas/${id}`);
        if (!response.ok) throw new Error('Erro ao carregar vaga.');
        const data = await response.json();
        setVaga(data);
      } catch (error) {
        console.error(error);
      } finally {
        setCarregando(false);
      }
    };

    fetchVaga();
  }, []);

  if (carregando) return <p className="text-center p-5">Carregando vaga...</p>;

  if (!vaga) return <p className="text-center p-5">Vaga não encontrada.</p>;

  return (
    <div className="max-w-4xl mx-auto p-5 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-4">{vaga.titulo}</h1>
      <p className="mb-2">{vaga.descricao}</p>
      <div className="space-y-2">
        <p><strong>Cidade:</strong> {vaga.cidade} - {vaga.estado}</p>
        <p><strong>Contrato:</strong> {vaga.tipoContrato}</p>
        <p><strong>Faixa Salarial:</strong> {vaga.faixaSalarial}</p>
        <p><strong>Início Previsto:</strong> {vaga.inicioPrevisto}</p>
      </div>
      <div className="flex gap-4 mt-5">
        <button
          onClick={() => router.push(`/vagas/${vaga.id}/candidatar-se`)}
          className="bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600"
        >
          Candidatar-se
        </button>
        <button
          onClick={() => router.push('/vagas')}
          className="bg-gray-300 text-black p-2 rounded-lg hover:bg-gray-400"
        >
          Voltar para Vagas
        </button>
      </div>
    </div>
  );
}
