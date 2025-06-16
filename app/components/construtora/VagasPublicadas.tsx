'use client';

import { useEffect, useState } from 'react';

interface Vaga {
  id: string;
  titulo: string;
  descricao: string;
  cidade: string;
  estado: string;
  contato: string;
}

export default function VagasPublicadas() {
  const [vagas, setVagas] = useState<Vaga[]>([]);

  useEffect(() => {
    const carregarVagas = async () => {
      try {
        const response = await fetch('/vagas-publicadas.json');
        const data = await response.json();
        setVagas(data);
      } catch (error) {
        console.error('Erro ao carregar vagas:', error);
      }
    };

    carregarVagas();
  }, []);

  return (
    <div className="p-4 bg-white rounded shadow">
      <h1 className="text-2xl font-bold text-center text-green-700 mb-4">Vagas Disponíveis</h1>
      <p className="text-center mb-6">
        Veja abaixo as vagas abertas pelas construtoras e prestadores de serviço. Se interessar por alguma, clique em “Candidatar-se via WhatsApp”.
      </p>

      {vagas.length === 0 ? (
        <p className="text-center">Nenhuma vaga publicada ainda.</p>
      ) : (
        <div className="space-y-4">
          {vagas.map((vaga) => (
            <div key={vaga.id} className="p-4 border border-gray-300 rounded shadow-sm">
              <h2 className="text-xl font-semibold">{vaga.titulo}</h2>
              <p>{vaga.descricao}</p>
              <p><strong>Cidade:</strong> {vaga.cidade} - {vaga.estado}</p>
              <p><strong>Contato:</strong> {vaga.contato}</p>
              <a
                href={`https://wa.me/55${vaga.contato.replace(/\D/g, '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block mt-2 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
              >
                Candidatar-se via WhatsApp
              </a>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
