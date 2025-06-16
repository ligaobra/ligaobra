'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [erro, setErro] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErro('');

    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, senha }),
      });

      if (response.ok) {
        router.push('/painel');
      } else {
        setErro('Credenciais inválidas.');
      }
    } catch (err) {
      console.error('Erro na requisição:', err);
      setErro('Erro ao tentar realizar o login.');
    }
  };

  return (
    <form onSubmit={handleLogin} className="max-w-md mx-auto p-5 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-green-600">Login - LigaObra</h2>

      <input
        type="email"
        placeholder="Seu e-mail"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full p-2 mb-3 border rounded-md"
      />

      <input
        type="password"
        placeholder="Sua senha"
        value={senha}
        onChange={(e) => setSenha(e.target.value)}
        className="w-full p-2 mb-3 border rounded-md"
      />

      {erro && <p className="text-red-500 mb-3">{erro}</p>}

      <button type="submit" className="w-full bg-green-500 text-white p-2 rounded-md hover:bg-green-600">
        Entrar
      </button>
    </form>
  );
}

