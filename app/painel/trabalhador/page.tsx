'use client';

import PainelWrapper from '../../../components/PainelWrapper';

export default function PainelTrabalhador() {
  return (
    <PainelWrapper>
      <h1 className="text-xl sm:text-2xl font-bold text-green-500 text-center mb-4">Painel do Trabalhador</h1>

      <div className="space-y-4">
        <p className="text-gray-200">Aqui você verá suas informações, histórico e vagas disponíveis.</p>

        <button className="bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded w-full text-sm sm:text-base">
          Editar Perfil
        </button>

        <button className="bg-gray-700 hover:bg-gray-800 text-white py-2 px-4 rounded w-full text-sm sm:text-base">
          Logout
        </button>
      </div>
    </PainelWrapper>
  );
}
