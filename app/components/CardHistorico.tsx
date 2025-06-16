import React from 'react';

interface Historico {
  id: string;
  acao: string;
  data: string;
}

export default function CardHistorico({ historico }: { historico: Historico }) {
  return (
    <div className="bg-white rounded-lg shadow-md p-4 mb-4 text-sm sm:text-base">
      <p className="text-gray-800">
        <strong>Ação:</strong> {historico.acao}
      </p>
      <p className="text-gray-500">
        <strong>Data:</strong> {historico.data}
      </p>
    </div>
  );
}
