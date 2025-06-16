'use client';

import { useEffect, useState } from 'react';

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

export default function ListaPrestadores() {
  const [prestadores, setPrestadores] = useState<Prestador[]>([]);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/prestadores');
        if (response.ok) {
          const data = await response.json();
          setPrestadores(data);
        } else {
          console.error("Erro ao carregar prestadores.");
        }
      } catch (error) {
        console.error("Erro de conexão:", error);
      } finally {
        setCarregando(false);
      }
    };

    fetchData();
  }, []);

  if (carregando) {
    return <div>Carregando...</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Lista de Prestadores</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {prestadores.map((prestador) => (
          <div key={prestador.id} className="border p-4 rounded-lg shadow-sm">
            <h3 className="text-lg font-semibold">{prestador.nomeEmpresa}</h3>
            <p><strong>Serviço:</strong> {prestador.tipoServico}</p>
            <p><strong>Cidade:</strong> {prestador.cidade} - {prestador.estado}</p>
            <p><strong>Site:</strong> <a href={prestador.site} target="_blank">{prestador.site}</a></p>
            <p><strong>Instagram:</strong> {prestador.instagram}</p>
            <p><strong>WhatsApp:</strong> {prestador.whatsapp}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
