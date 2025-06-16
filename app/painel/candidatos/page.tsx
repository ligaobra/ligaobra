'use client';

import { useState, useEffect } from 'react';
import PainelWrapper from '../../../components/PainelWrapper';

interface Candidato {
  id: string;
  nome: string;
  whatsapp: string;
  vagaId: string;
}

export default function PainelCandidatos() {
  const [candidatos, setCandidatos] = useState<Candidato[]>([]);

  useEffect(() => {
    const fetchCandidatos = async () => {
      try {
        const res = await fetch('/api/candidatos');
        if (res.ok) setCandidatos(await res.json());
      } catch (err) {
        console.error('Erro ao buscar candidatos:', err);
      }
    };

    fetchCandidatos();
  }, []);

  return (
    <PainelWrapper>
      <div className="px-4 sm:px-6 lg:px-8">
        <h1 className="text-xl sm:text-2xl font-bold text-green-500 text-center mb-6">Candidatos</h1>

        {candidatos.length > 0 ? (
          candidatos.map((c) => (
            <div
              key={c.id}
              className="bg-white rounded-lg shadow-md p-4 mb-6 space-y-1 text-sm sm:text-base"
            >
              <p className="text-gray-800 font-semibold">{c.nome}</p>
              <p className="text-gray-500">{c.whatsapp}</p>
              <p className="text-gray-400">Vaga ID: {c.vagaId}</p>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-400 italic">Nenhum candidato encontrado.</p>
        )}
      </div>
    </PainelWrapper>
  );
}
