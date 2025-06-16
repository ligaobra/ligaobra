'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import PainelWrapper from '../../../components/PainelWrapper';

interface Prestador {
  id: string;
  nomeEmpresa: string;
  tipoServico: string;
  segmento: string;
  cidade: string;
  estado: string;
  site: string;
  instagram: string;
  whatsapp: string;
}

export default function ListaPrestadores() {
  const router = useRouter();
  const [prestadores, setPrestadores] = useState<Prestador[]>([]);

  useEffect(() => {
    const fetchPrestadores = async () => {
      try {
        const response = await fetch('/api/todos-prestadores');
        if (response.ok) {
          const data: Prestador[] = await response.json();
          setPrestadores(data);
        } else {
          console.error('Erro ao buscar prestadores:', await response.json());
        }
      } catch (error) {
        console.error('Erro ao buscar prestadores:', error);
      }
    };

    fetchPrestadores();
  }, []);

  return (
    <PainelWrapper>
      <h1 className="text-2xl font-bold text-green-700 text-center mb-6">Todos os Prestadores de Serviço</h1>

      {prestadores.length > 0 ? (
        prestadores.map((prestador) => (
          <div key={prestador.id} className="bg-white p-4 rounded shadow-md mb-4 space-y-1">
            <p><strong>Nome:</strong> {prestador.nomeEmpresa}</p>
            <p><strong>Tipo de Serviço:</strong> {prestador.tipoServico}</p>
            <p><strong>Segmento:</strong> {prestador.segmento}</p>
            <p><strong>Cidade:</strong> {prestador.cidade}</p>
            <p><strong>Estado:</strong> {prestador.estado}</p>
            <p><strong>Site:</strong> {prestador.site}</p>
            <p><strong>Instagram:</strong> {prestador.instagram}</p>
            <p><strong>WhatsApp:</strong> {prestador.whatsapp}</p>

            <button
              onClick={() => router.push(`/painel/prestadores/${prestador.id}`)}
              className="mt-2 bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded"
            >
              Ver Detalhes
            </button>
          </div>
        ))
      ) : (
        <p className="text-center text-gray-700">Nenhum prestador cadastrado ainda.</p>
      )}
    </PainelWrapper>
  );
}
