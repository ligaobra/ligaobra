'use client';

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';

interface Vaga {
  id: string;
  titulo: string;
  cidade: string;
  estado: string;
  tipoContrato: string;
  faixaSalarial: string;
  inicioPrevisto: string;
}

export default function EditarVaga() {
  const { id } = useParams();
  const [vaga, setVaga] = useState<Vaga | null>(null);

  useEffect(() => {
    const fetchVaga = async () => {
      try {
        const response = await fetch(`/api/vagas-publicadas/${id}`);
        if (!response.ok) throw new Error('Erro ao carregar vaga.');
        const data = await response.json();
        setVaga(data);
      } catch (error) {
        console.error(error);
      }
    };

    if (id) {
      fetchVaga();
    }
  }, [id]);

  if (!vaga) {
    return <p>Carregando vaga...</p>;
  }

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Editar Vaga</h2>
      <form className="space-y-4">
        <input
          type="text"
          value={vaga.titulo}
          placeholder="Título da Vaga"
          className="w-full p-2 border rounded"
        />
        <input
          type="text"
          value={vaga.cidade}
          placeholder="Cidade"
          className="w-full p-2 border rounded"
        />
        <input
          type="text"
          value={vaga.estado}
          placeholder="Estado"
          className="w-full p-2 border rounded"
        />
        <input
          type="text"
          value={vaga.tipoContrato}
          placeholder="Tipo de Contrato"
          className="w-full p-2 border rounded"
        />
        <input
          type="text"
          value={vaga.faixaSalarial}
          placeholder="Faixa Salarial"
          className="w-full p-2 border rounded"
        />
        <input
          type="text"
          value={vaga.inicioPrevisto}
          placeholder="Início Previsto"
          className="w-full p-2 border rounded"
        />
      </form>
    </div>
  );
}
