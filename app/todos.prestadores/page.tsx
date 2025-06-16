'use client';

import { useState, useEffect } from 'react';
import PainelWrapper from '../../components/PainelWrapper';

interface Prestador {
  id: string;
  nomeEmpresa: string;
  tipoServico: string;
  cidade: string;
  estado: string;
  site?: string;
  instagram?: string;
  whatsapp?: string;
}

export default function TodosPrestadores() {
  const [prestadores, setPrestadores] = useState<Prestador[]>([]);

  useEffect(() => {
    const fetchPrestadores = async () => {
      try {
        const res = await fetch('/api/prestadores');
        if (res.ok) setPrestadores(await res.json());
      } catch (err) {
        console.error('Erro ao buscar prestadores:', err);
      }
    };

    fetchPrestadores();
  }, []);

  return (
    <PainelWrapper>
      <div className="px-4 sm:px-6 lg:px-8">
        <h1 className="text-xl sm:text-2xl font-bold text-green-500 text-center mb-6">
          Todos os Prestadores de Serviço
        </h1>

        {prestadores.length > 0 ? (
          prestadores.map((p) => (
            <div
              key={p.id}
              className="bg-white rounded-lg shadow-md p-4 mb-6 space-y-2 text-sm sm:text-base"
            >
              <p className="text-gray-800 font-semibold">{p.nomeEmpresa}</p>
              <p className="text-gray-500">Tipo de Serviço: {p.tipoServico}</p>
              <p className="text-gray-500">{p.cidade} - {p.estado}</p>

              {p.site && (
                <p className="text-gray-500">
                  <strong>Site:</strong>{' '}
                  <a
                    href={p.site}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-green-600 hover:underline"
                  >
                    {p.site}
                  </a>
                </p>
              )}

              {p.instagram && (
                <p className="text-gray-500">
                  <strong>Instagram:</strong>{' '}
                  <a
                    href={`https://instagram.com/${p.instagram.replace('@', '')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-green-600 hover:underline"
                  >
                    {p.instagram}
                  </a>
                </p>
              )}

              {p.whatsapp && (
                <a
                  href={`https://wa.me/${p.whatsapp}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block bg-green-600 hover:bg-green-700 text-white py-2 px-3 sm:px-4 rounded w-full min-h-[48px] text-sm sm:text-base"
                >
                  Contatar via WhatsApp
                </a>
              )}
            </div>
          ))
        ) : (
          <p className="text-center text-gray-400 italic">Nenhum prestador cadastrado.</p>
        )}
      </div>
    </PainelWrapper>
  );
}
