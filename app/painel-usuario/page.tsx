'use client'

import PainelBase from '@/components/PainelBase'
import { useRouter } from 'next/navigation'

export default function PainelUsuarioPage() {
  const router = useRouter()

  return (
    <PainelBase titulo="Painel do Usuário">
      <div className="flex flex-col space-y-4">
        <button
          onClick={() => router.push('/cadastro-vagas')}
          className="bg-green-600 text-white py-2 rounded hover:bg-green-700"
        >
          Cadastrar Nova Vaga
        </button>
        <button
          onClick={() => router.push('/vagas')}
          className="bg-green-600 text-white py-2 rounded hover:bg-green-700"
        >
          Visualizar Vagas
        </button>
        <button
          onClick={() => router.push('/')}
          className="text-sm text-gray-300 underline"
        >
          Voltar para Início
        </button>
      </div>
    </PainelBase>
  )
}
