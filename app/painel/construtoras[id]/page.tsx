'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import PainelWrapper from '../../../components/PainelWrapper';

interface Construtora {
  id: string;
  nomeEmpresa: string;
  cidade: string;
  estado: string;
  site: string;
  instagram: string;
  whatsapp: string;
}

export default function DetalheConstrutora() {
  const router = useRouter();
  const params = useParams();
  const { id } = params;

  const [construtora, setConstrutora] = useState<Construtora | null>(null);

  useEffect(() => {
    const fetchConstrutora = async () => {
      try {
        const response = await fetch(`/api/construtoras/${id}`);
        if (response.ok) {
          const data: Construtora = await response.json();
          setConstrutora(data);
        } else {
          console.error('Erro ao buscar construtora:', await response.json());
        }
      } catch (error) {
        console.error('Erro ao buscar construtora:', error);
      }
    };

    fetchConstrutora();
  }, [id]);

  return (
    <PainelWrapper>
      <h1 className="text-2xl font-bold text-green-700 text-center mb-6">Detalhes da Construtora</h1>

      {construtora ? (
        <div className="space-y-2 text-gray-800">
          <p><strong>Nome:</strong> {construtora.nomeEmpresa}</p>
          <p><strong>Cidade:</strong> {construtora.cidade}</p>
          <p><strong>Estado:</strong> {construtora.estado}</p>
          <p><strong>Site:</strong> {construtora.site}</p>
          <p><strong>Instagram:</strong> {construtora.instagram}</p>
          <p><strong>WhatsApp:</strong> {construtora.whatsapp}</p>
        </div>
      ) : (
        <p>Carregando dados da construtora...</p>
      )}

      <button
        onClick={() => router.push('/painel/construtoras')}
        className="mt-6 bg-gray-700 hover:bg-gray-800 text-white py-2 px-4 rounded w-full"
      >
        Voltar para Listagem
      </button>
    </PainelWrapper>
  );
}
