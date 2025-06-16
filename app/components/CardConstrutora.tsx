import React from 'react';

interface Construtora {
  id: string;
  nomeEmpresa: string;
  cidade: string;
  estado: string;
  site?: string;
  instagram?: string;
  whatsapp?: string;
}

export default function CardConstrutora({ construtora }: { construtora: Construtora }) {
  return (
    <div className="bg-white rounded-lg shadow-md p-4 mb-4 space-y-2 text-sm sm:text-base">
      <h2 className="text-lg font-semibold text-gray-800">{construtora.nomeEmpresa}</h2>

      <p className="text-gray-600">
        <strong>Local:</strong> {construtora.cidade} - {construtora.estado}
      </p>

      {construtora.site && (
        <p className="text-gray-500">
          <strong>Site:</strong>{' '}
          <a
            href={construtora.site}
            target="_blank"
            rel="noopener noreferrer"
            className="text-green-600 hover:underline"
          >
            {construtora.site}
          </a>
        </p>
      )}

      {construtora.instagram && (
        <p className="text-gray-500">
          <strong>Instagram:</strong>{' '}
          <a
            href={`https://instagram.com/${construtora.instagram.replace('@', '')}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-green-600 hover:underline"
          >
            {construtora.instagram}
          </a>
        </p>
      )}

      {construtora.whatsapp && (
        <a
          href={`https://wa.me/${construtora.whatsapp}`}
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
