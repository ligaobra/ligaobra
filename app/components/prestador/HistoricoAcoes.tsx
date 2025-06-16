'use client';

import React, { useEffect, useState } from 'react';

interface Acao {
  id: string;
  descricao: string;
  data: string;
}

const HistoricoAcoes = () => {
  const [carregando, setCarregando] = useState(true);
  const [historico, setHistorico] = useState<Acao[]>([]);

  useEffect(() => {
    const buscarHistorico = async () => {
      try {
        const response = await fetch('/api/historico-acoes');
        if (!response.ok) throw new Error('Erro ao buscar histórico');
        
        const data = await response.json();
        setHistorico(data);
      } catch (error) {
        console.error("Erro ao buscar histórico:", error);
      } finally {
        setCarregando(false);
      }
    };

    buscarHistorico();
  }, []);

  return (
    <div className="p-4 border border-gray-200 rounded-md">
      <h2 className="text-xl font-bold mb-2">Histórico de Ações:</h2>
      {carregando ? (
        <p>Carregando histórico...</p>
      ) : (
        historico.map((acao) => (
          <div key={acao.id} className="mb-2">
            <p>{acao.descricao} - {acao.data}</p>
          </div>
        ))
      )}
    </div>
  );
};

export default HistoricoAcoes;
