'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import PainelWrapper from '../../components/PainelWrapper';

export default function LoginPage() {
  const router = useRouter();

  const [cpfOuCnpj, setCpfOuCnpj] = useState('');
  const [senha, setSenha] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const dadosLogin = {
      cpfOuCnpj,
      senha,
    };

    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dadosLogin),
      });

      if (response.ok) {
        alert('Login realizado com sucesso!');
        router.push('/');
      } else {
        alert('Falha no login. Verifique seus dados.');
      }
    } catch (error) {
      console.error('Erro no login:', error);
      alert('Erro ao tentar fazer login.');
    }
  };

  return (
    <PainelWrapper>
      <h1 className="text-2xl font-bold text-green-700 text-center mb-6">Login</h1>
      <form onSubmit={handleSubmit} className="space-y-4">

        <input
          type="text"
          placeholder="CPF ou CNPJ"
          value={cpfOuCnpj}
          onChange={(e) => setCpfOuCnpj(e.target.value)}
          className="border border-gray-300 rounded px-4 py-2 w-full"
        />

        <input
          type="password"
          placeholder="Senha"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
          className="border border-gray-300 rounded px-4 py-2 w-full"
        />

        <button
          type="submit"
          className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded w-full"
        >
          Entrar
        </button>

      </form>
    </PainelWrapper>
  );
}
