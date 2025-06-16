'use client';

import React, { useEffect, useState } from 'react';

interface Vaga {
  id: string;
  titulo: string;
  cidade: string;
  estado: string;
  tipoContrato: string;
}

export default function Dashboard() {
  const [vagas, setVagas] = useState<Vaga[]>([]);

  useEffect(() => {
    const fetchVagas = async () => {
      try {
        const response = await fetch('/api/vagas');
        const data = await response.json();
        setVagas(data);
      } catch (error) {
        console.error('Erro ao carregar vagas:', error);
      }
    };

    fetchVagas();
  }, []);

  return (
    <div className="p-5">
      <h2 className="text-2xl font-bold mb-4">Minhas Vagas Publicadas</h2>
      <div className="grid grid-cols-1 gap-4">
        {vagas.length > 0 ? (
          vagas.map((vaga) => (
            <div key={vaga.id} className="p-4 border rounded-md bg-white shadow-sm">
              <h3 className="font-semibold">{vaga.titulo}</h3>
              <p>{vaga.cidade} - {vaga.estado}</p>
              <p>{vaga.tipoContrato}</p>
            </div>
          ))
        ) : (
          <p>Nenhuma vaga cadastrada.</p>
        )}
      </div>
    </div>
  );
}
