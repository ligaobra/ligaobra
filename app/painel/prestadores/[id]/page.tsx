'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import PainelWrapper from '../../../../components/PainelWrapper';

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

export default function DetalhePrestador() {
  const router = useRouter();
  const params = useParams();
  const { id } = params;

  const [prestador, setPrestador] = useState<Prestador | null>(null);

  useEffect(() => {
    const fetchPrestador = async () => {
      try {
        const response = await fetch(`/api/prestadores/${id}`);
        if (response.ok) {
          const data: Prestador = await response.json();
          setPrestador(data);
        } else {
          console.error('Erro ao buscar prestador:', await response.json());
        }
      } catch (error) {
        console.error('Erro ao buscar prestador:', error);
      }
    };

    fetchPrestador();
  }, [id]);

  return (
    <PainelWrapper>
      <h1 className="text-2xl font-bold text-green-700 text-center mb-6">Detalhes do Prestador</h1>

      {prestador ? (
        <div className="space-y-2 text-gray-800">
          <p><strong>Nome:</strong> {prestador.nomeEmpresa}</p>
          <p><strong>Tipo de Serviço:</strong> {prestador.tipoServico}</p>
          <p><strong>Segmento:</strong> {prestador.segmento}</p>
          <p><strong>Cidade:</strong> {prestador.cidade}</p>
          <p><strong>Estado:</strong> {prestador.estado}</p>
          <p><strong>Site:</strong> {prestador.site}</p>
          <p><strong>Instagram:</strong> {prestador.instagram}</p>
          <p><strong>WhatsApp:</strong> {prestador.whatsapp}</p>
        </div>
      ) : (
        <p>Carregando detalhes do prestador...</p>
      )}

      <button
        onClick={() => router.push('/painel/prestadores')}
        className="mt-6 bg-gray-700 hover:bg-gray-800 text-white py-2 px-4 rounded w-full"
      >
        Voltar para Listagem
      </button>
    </PainelWrapper>
  );
}
