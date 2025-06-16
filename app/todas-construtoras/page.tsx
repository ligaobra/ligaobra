'use client';

import { useState, useEffect } from 'react';
import PainelWrapper from '../../components/PainelWrapper';

interface Construtora {
  id: string;
  nomeEmpresa: string;
  cidade: string;
  estado: string;
  site?: string;
  instagram?: string;
  whatsapp?: string;
}

export default function TodasConstrutoras() {
  const [construtoras, setConstrutoras] = useState<Construtora[]>([]);

  useEffect(() => {
    const fetchConstrutoras = async () => {
      try {
        const res = await fetch('/api/construtoras');
        if (res.ok) setConstrutoras(await res.json());
      } catch (err) {
        console.error('Erro ao buscar construtoras:', err);
      }
    };

    fetchConstrutoras();
  }, []);

  return (
    <PainelWrapper>
      <div className="px-4 sm:px-6 lg:px-8">
        <h1 className="text-xl sm:text-2xl font-bold text-green-500 text-center mb-6">
          Todas as Construtoras
        </h1>

        {construtoras.length > 0 ? (
          construtoras.map((c) => (
            <div
              key={c.id}
              className="bg-white rounded-lg shadow-md p-4 mb-6 space-y-2 text-sm sm:text-base"
            >
              <p className="text-gray-800 font-semibold">{c.nomeEmpresa}</p>
              <p className="text-gray-500">{c.cidade} - {c.estado}</p>

              {c.site && (
                <p className="text-gray-500">
                  <strong>Site:</strong>{' '}
                  <a
                    href={c.site}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-green-600 hover:underline"
                  >
                    {c.site}
                  </a>
                </p>
              )}

              {c.instagram && (
                <p className="text-gray-500">
                  <strong>Instagram:</strong>{' '}
                  <a
                    href={`https://instagram.com/${c.instagram.replace('@', '')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-green-600 hover:underline"
                  >
                    {c.instagram}
                  </a>
                </p>
              )}

              {c.whatsapp && (
                <a
                  href={`https://wa.me/${c.whatsapp}`}
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
          <p className="text-center text-gray-400 italic">Nenhuma construtora cadastrada.</p>
        )}
      </div>
    </PainelWrapper>
  );
}
