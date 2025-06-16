'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

interface Vaga {
  id: string;
  titulo: string;
  descricao: string;
  cidade: string;
  estado: string;
  salario: string;
}

export default function VagasPublicadasPublica() {
  const router = useRouter();
  const [vagas, setVagas] = useState<Vaga[]>([]);

  useEffect(() => {
    const fetchVagas = async () => {
      try {
        const response = await fetch('/api/vagas-publicadas');
        if (response.ok) {
          const data: Vaga[] = await response.json();
          setVagas(data);
        } else {
          console.error('Erro ao carregar vagas públicas:', await response.json());
        }
      } catch (error) {
        console.error('Erro ao buscar vagas públicas:', error);
      }
    };

    fetchVagas();
  }, []);

  return (
    <div className="space-y-6">
      {vagas.length > 0 ? (
        vagas.map((vaga) => (
          <div key={vaga.id} className="bg-white p-4 rounded-xl shadow-md space-y-2">
            <h2 className="text-xl font-semibold text-gray-800">{vaga.titulo}</h2>
            <p className="text-gray-600">{vaga.descricao}</p>
            <p className="text-gray-500">
              {vaga.cidade} - {vaga.estado}
            </p>
            <p className="text-green-700 font-bold">Salário: {vaga.salario}</p>

            <button
              onClick={() => router.push(`/candidatar/${vaga.id}`)}
              className="mt-2 bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded"
            >
              Ver Detalhes
            </button>
          </div>
        ))
      ) : (
        <p className="text-center text-gray-700">Nenhuma vaga disponível no momento.</p>
      )}
    </div>
  );
}
