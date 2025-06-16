'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import PainelWrapper from '../../components/PainelWrapper';

interface Vaga {
  id: string;
  titulo: string;
  descricao: string;
  cidade: string;
  estado: string;
  salario: string;
}

export default function VagasPublicas() {
  const [vagas, setVagas] = useState<Vaga[]>([]);
  const router = useRouter();

  useEffect(() => {
    const fetchVagas = async () => {
      try {
        const res = await fetch('/api/vagas-publicadas');
        if (res.ok) setVagas(await res.json());
      } catch (err) {
        console.error('Erro ao buscar vagas:', err);
      }
    };

    fetchVagas();
  }, []);

  return (
    <PainelWrapper>
      <div className="px-4 sm:px-6 lg:px-8">
        <h1 className="text-xl sm:text-2xl font-bold text-green-500 text-center mb-6">Vagas Disponíveis</h1>

        {vagas.length > 0 ? (
          vagas.map((vaga) => (
            <div
              key={vaga.id}
              className="bg-white rounded-lg shadow-md p-4 mb-6 space-y-2 text-sm sm:text-base"
            >
              <h2 className="text-lg font-semibold text-gray-800">{vaga.titulo}</h2>
              <p className="text-gray-700">{vaga.descricao}</p>
              <p className="text-gray-500">{vaga.cidade} - {vaga.estado}</p>
              {vaga.salario && (
                <p className="text-green-700 font-semibold">Salário: {vaga.salario}</p>
              )}
              <button
                onClick={() => router.push(`/candidatar/${vaga.id}`)}
                className="bg-green-600 hover:bg-green-700 text-white py-2 px-3 sm:px-4 rounded w-full min-h-[48px] text-sm sm:text-base"
              >
                Candidatar-se via WhatsApp
              </button>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-400 italic">Nenhuma vaga publicada.</p>
        )}
      </div>
    </PainelWrapper>
  );
}
