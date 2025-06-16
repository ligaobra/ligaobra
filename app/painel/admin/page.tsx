'use client';

import { useRouter } from 'next/navigation';
import PainelWrapper from '../../../components/PainelWrapper';

export default function PainelAdmin() {
  const router = useRouter();

  return (
    <PainelWrapper>
      <div className="px-4 sm:px-6 lg:px-8 space-y-4">
        <h1 className="text-xl sm:text-2xl font-bold text-green-500 text-center mb-6">Painel Administrativo</h1>

        <button
          onClick={() => router.push('/todas-vagas')}
          className="bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded w-full min-h-[48px]"
        >
          Ver Todas as Vagas
        </button>

        <button
          onClick={() => router.push('/todas-construtoras')}
          className="bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded w-full min-h-[48px]"
        >
          Ver Todas as Construtoras
        </button>

        <button
          onClick={() => router.push('/todos-prestadores')}
          className="bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded w-full min-h-[48px]"
        >
          Ver Todos os Prestadores
        </button>

        <button
          onClick={() => router.push('/painel/historico')}
          className="bg-gray-700 hover:bg-gray-800 text-white py-2 px-4 rounded w-full min-h-[48px]"
        >
          Ver Histórico de Ações
        </button>
      </div>
    </PainelWrapper>
  );
}
