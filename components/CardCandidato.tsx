import React from 'react';

interface Candidato {
  id: string;
  nome: string;
  whatsapp: string;
  vagaId: string;
}

export default function CardCandidato({
  candidato,
  onRespond
}: {
  candidato: Candidato;
  onRespond: (candidatoId: string) => void;
}) {
  return (
    <div className="bg-white rounded-lg shadow-md p-4 mb-4 space-y-2 text-sm sm:text-base">
      <p className="text-gray-800"><strong>Nome:</strong> {candidato.nome}</p>
      <p className="text-gray-500"><strong>WhatsApp:</strong> {candidato.whatsapp}</p>
      <button
        onClick={() => onRespond(candidato.id)}
        className="bg-green-600 hover:bg-green-700 text-white py-2 px-3 sm:px-4 rounded w-full text-sm sm:text-base"
      >
        Ver vaga relacionada
      </button>
    </div>
  );
}
