'use client';

import React, { useEffect, useState } from 'react';

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

export default function VitrinePrestadores() {
  const [prestadores, setPrestadores] = useState<Prestador[]>([]);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    const buscarPrestadores = async () => {
      try {
        const resposta = await fetch('/api/cadastro-prestador');
        const dados = await resposta.json();
        setPrestadores(dados);
      } catch (erro) {
        console.error('Erro ao carregar prestadores:', erro);
      } finally {
        setCarregando(false);
      }
    };

    buscarPrestadores();
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Prestadores de Serviço Cadastrados</h1>

      {carregando ? (
        <p>Carregando prestadores...</p>
      ) : prestadores.length === 0 ? (
        <p>Nenhum prestador encontrado.</p>
      ) : (
        <ul className="space-y-4">
          {prestadores.map((p) => (
            <li key={p.id} className="border p-4 rounded-xl shadow">
              <h2 className="text-lg font-semibold">{p.nomeEmpresa}</h2>
              <p className="text-sm text-gray-600">{p.tipoServico} — {p.cidade}/{p.estado}</p>

              <div className="mt-2 space-x-4 text-sm">
                {p.whatsapp && (
                  <a
                    href={`https://wa.me/${p.whatsapp.replace(/\D/g, '')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-green-600 underline"
                  >
                    WhatsApp
                  </a>
                )}
                {p.instagram && (
                  <a
                    href={`https://instagram.com/${p.instagram.replace('@', '')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-pink-600 underline"
                  >
                    Instagram
                  </a>
                )}
                {p.site && (
                <a
                  href={p.site}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition text-sm"
                >
                  Site
                </a>
              )}
            </div>
          </li>
        ))}
      </ul>
      )}
    </div>
  );
}

         
       
         
       
      
   
      
