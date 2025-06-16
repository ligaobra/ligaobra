'use client'

import PainelBase from '@/components/PainelBase'
import { useRouter } from 'next/navigation'

export default function CadastroPage() {
  const router = useRouter()

  
  return (
    <PainelBase titulo="Cadastro de Usuário">
      <form className="flex flex-col space-y-4">
        <input
          type="text"
          placeholder="Nome"
          className="p-2 rounded bg-gray-700 text-white"
        />
        <input
          type="email"
          placeholder="E-mail"
          className="p-2 rounded bg-gray-700 text-white"
        />
        <input
          type="password"
          placeholder="Senha"
          className="p-2 rounded bg-gray-700 text-white"
        />
        <button
          onClick={() => router.push('/login')}
          className="bg-green-600 text-white py-2 rounded hover:bg-green-700"
        >
          Cadastrar
        </button>
        <button
          onClick={() => router.push('/')}
          className="text-sm text-gray-300 underline"
        >
          Voltar para Início

<button
  className="button-principal"
  onClick={() => alert("Cadastro realizado com sucesso!")}
>
  Cadastrar
</button>


        </button>
      </form>
    </PainelBase>
  )
}
