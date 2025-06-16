
import React from 'react';

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

export default function CardPrestador({ prestador }: { prestador: Prestador }) {
  return (
    <div className="bg-white rounded-lg shadow-md p-4 mb-4 space-y-2 text-sm sm:text-base">
      <h2 className="text-lg font-semibold text-gray-800">{prestador.nomeEmpresa}</h2>

      <p className="text-gray-600">
        <strong>Tipo de Serviço:</strong> {prestador.tipoServico}
      </p>

      <p className="text-gray-500">
        <strong>Local:</strong> {prestador.cidade} - {prestador.estado}
      </p>

      {prestador.whatsapp && (
        <a
          href={`https://wa.me/${prestador.whatsapp}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block bg-green-600 hover:bg-green-700 text-white py-2 px-3 sm:px-4 rounded text-sm sm:text-base"
        >
          Contatar via WhatsApp
        </a>
      )}
    </div>
  );
}
