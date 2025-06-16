'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import HistoricoAcoes from '@/components/prestador/HistoricoAcoes';
import VagasDoPrestador from '@/components/prestador/VagasDoPrestador';

export default function PainelPrestador() {
  const router = useRouter();

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-green-600 mb-4">Painel do Prestador</h1>

      {/* Histórico de ações */}
      <HistoricoAcoes />

      {/* Vagas publicadas */}
      <VagasDoPrestador />

      {/* Botão de editar perfil */}
      <button
        onClick={() => router.push('/painel-prestador/editar-perfil')}
        className="mt-6 px-4 py-2 bg-green-600 text-white rounded-xl hover:bg-green-700 transition"
      >
        Editar Perfil
      </button>
    </div>
  );
}
