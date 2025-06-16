import React from 'react';
import { useRouter } from 'next/navigation';

interface Vaga {
  id: string;
  titulo: string;
  descricao: string;
  cidade: string;
  estado: string;
  tipoContrato: string;
  faixaSalarial: string;
  inicioPrevisto: string;
  whatsapp?: string;
  exibirBotaoEditar?: boolean;
}

export default function CardVaga({ vaga }: { vaga: Vaga }) {
  const router = useRouter();

  return (
    <div className="border p-4 rounded shadow">
      <h3 className="text-lg font-bold">{vaga.titulo}</h3>
      <p className="text-sm">{vaga.descricao}</p>
      <p className="text-sm text-gray-600">
        {vaga.cidade}, {vaga.estado}
      </p>
      <p className="text-sm">Contrato: {vaga.tipoContrato}</p>
      <p className="text-sm">Salário: {vaga.faixaSalarial}</p>
      <p className="text-sm">Início: {vaga.inicioPrevisto}</p>

      {vaga.whatsapp && (
        <a
          href={`https://wa.me/${vaga.whatsapp.replace(/[^0-9]/g, '')}`}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-2 inline-block bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          Candidatar-se via WhatsApp
        </a>
      )}

      {vaga.exibirBotaoEditar && (
        <button
          onClick={() => router.push(`/painel/vagas/editar/${vaga.id}`)}
          className="mt-2 inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 ml-2"
        >
          Editar Vaga
        </button>
      )}
    </div>
  );
}

