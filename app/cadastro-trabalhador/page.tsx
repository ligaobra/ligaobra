'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import PainelWrapper from '../../components/PainelWrapper';

export default function CadastroTrabalhador() {
  const router = useRouter();

  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [telefone, setTelefone] = useState('');
  const [cidade, setCidade] = useState('');
  const [estado, setEstado] = useState('');
  const [cpfOuCnpj, setCpfOuCnpj] = useState('');
  const [senha, setSenha] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const novoTrabalhador = {
      nome,
      email,
      telefone,
      cidade,
      estado,
      cpfOuCnpj,
      senha,
    };

    try {
      const response = await fetch('/api/cadastrar-trabalhador', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(novoTrabalhador),
      });

      if (response.ok) {
        alert('Trabalhador cadastrado com sucesso!');
        router.push('/');
      } else {
        alert('Erro ao cadastrar o trabalhador.');
      }
    } catch (error) {
      console.error('Erro ao cadastrar:', error);
      alert('Erro ao cadastrar.');
    }
  };

  return (
    <PainelWrapper>
      <h1 className="text-2xl font-bold text-green-700 text-center mb-6">Cadastro de Trabalhador</h1>
      <form onSubmit={handleSubmit} className="space-y-4">

        <input
          type="text"
          placeholder="Nome"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          className="border border-gray-300 rounded px-4 py-2 w-full"
        />

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border border-gray-300 rounded px-4 py-2 w-full"
        />

        <input
          type="text"
          placeholder="Telefone"
          value={telefone}
          onChange={(e) => setTelefone(e.target.value)}
          className="border border-gray-300 rounded px-4 py-2 w-full"
        />

        <input
          type="text"
          placeholder="Cidade"
          value={cidade}
          onChange={(e) => setCidade(e.target.value)}
          className="border border-gray-300 rounded px-4 py-2 w-full"
        />

        <input
          type="text"
          placeholder="Estado"
          value={estado}
          onChange={(e) => setEstado(e.target.value)}
          className="border border-gray-300 rounded px-4 py-2 w-full"
        />

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
          Cadastrar Trabalhador
        </button>

      </form>
    </PainelWrapper>
  );
}
