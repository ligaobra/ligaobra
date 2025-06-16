'use client';

import React, { useEffect, useState } from 'react';
import CardPrestador from './CardPrestador';

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

export default function ListaPrestadores() {
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
    <div>
      <h2 className="text-xl font-semibold mb-4">Prestadores Disponíveis</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {prestadores.map((prestador) => (
          <CardPrestador key={prestador.id} prestador={prestador} />
        ))}
      </div>
    </div>
  );
}


