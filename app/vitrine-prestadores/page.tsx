'use client';

import React, { useEffect, useState } from 'react';
import CardPrestador from '@/components/CardPrestador';

interface Prestador {
  id: string;
  nomeEmpresa: string;
  tipoServico: string;
  cidade: string;
  estado: string;
  site?: string;
  instagram?: string;
  whatsapp?: string;
}

export default function VitrinePrestadores() {
  const [prestadores, setPrestadores] = useState<Prestador[]>([]);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    const buscarPrestadores = async () => {
      try {
        const resposta = await fetch('/api/cadastro-prestador');
        const dados = await resposta.json();
        setPrestadores(dados);
      } catch (erro) {
        console.error('Erro ao carregar prestadores:', erro);
      } finally {
        setCarregando(false);
      }
    };

    buscarPrestadores();
  }, []);

  if (carregando) return <p>Carregando prestadores...</p>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold text-center mb-6 text-green-700">Vitrine de Prestadores de Serviço</h1>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {prestadores.map((prestador) => (
          <CardPrestador key={prestador.id} prestador={prestador} />
        ))}
      </div>
    </div>
  );
}
