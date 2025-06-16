'use client';

import PainelWrapper from '../../../components/PainelWrapper';
import CardHistorico from '../../components/CardHistorico';

interface Historico {
  id: string;
  acao: string;
  data: string;
}

export default function PainelHistorico() {
  const historicos: Historico[] = [
    { id: '1', acao: 'Cadastro de vaga realizado', data: '2025-06-16 10:30' },
    { id: '2', acao: 'Perfil de prestador atualizado', data: '2025-06-15 14:20' },
    { id: '3', acao: 'Exclusão de vaga', data: '2025-06-14 09:45' },
  ];

  return (
    <PainelWrapper>
      <div className="px-4 sm:px-6 lg:px-8">
        <h1 className="text-xl sm:text-2xl font-bold text-green-500 text-center mb-6">Histórico de Ações</h1>

        {historicos.length > 0 ? (
          historicos.map((item) => <CardHistorico key={item.id} historico={item} />)
        ) : (
          <p className="text-center text-gray-400 italic">Nenhuma ação registrada.</p>
        )}
      </div>
    </PainelWrapper>
  );
}
