'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

export default function CriarVaga() {
  const router = useRouter();
  const [erro, setErro] = useState('');
  const [vaga, setVaga] = useState({
    id: Date.now().toString(),
    titulo: '',
    cidade: '',
    estado: '',
    tipoContrato: '',
    faixaSalarial: '',
    inicioPrevisto: '',
    descricao: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setVaga({ ...vaga, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validações básicas
    if (!vaga.titulo || !vaga.descricao || !vaga.cidade || !vaga.estado) {
      setErro('Todos os campos são obrigatórios.');
      return;
    }

    try {
      const response = await fetch('/api/criar-vaga', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(vaga),
      });

      if (response.ok) {
        toast.success('Vaga criada com sucesso!');
        router.push('/painel/vagas');
      } else {
        toast.error('Erro ao criar a vaga.');
      }
    } catch (error) {
      console.error("❌ Erro ao criar a vaga:", error.message);
      toast.error('Erro ao criar a vaga.');
    }
  };

  return (
    <div className="max-w-md mx-auto p-4 border border-gray-300 rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold mb-4">Criar Nova Vaga</h1>

      {erro && (
        <p className="bg-red-200 text-red-600 p-2 mb-4 rounded-md">
          {erro}
        </p>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-semibold">Título:</label>
          <input type="text" name="titulo" value={vaga.titulo} onChange={handleInputChange} className="w-full p-2 border border-gray-300 rounded-md" />
        </div>
        <div>
          <label className="block font-semibold">Descrição:</label>
          <textarea name="descricao" value={vaga.descricao} onChange={handleInputChange} className="w-full p-2 border border-gray-300 rounded-md" />
        </div>
        <div>
          <label className="block font-semibold">Cidade:</label>
          <input type="text" name="cidade" value={vaga.cidade} onChange={handleInputChange} className="w-full p-2 border border-gray-300 rounded-md" />
        </div>
        <div>
          <label className="block font-semibold">Estado:</label>
          <input type="text" name="estado" value={vaga.estado} onChange={handleInputChange} className="w-full p-2 border border-gray-300 rounded-md" />
        </div>
        <div>
          <label className="block font-semibold">Tipo de Contrato:</label>
          <input type="text" name="tipoContrato" value={vaga.tipoContrato} onChange={handleInputChange} className="w-full p-2 border border-gray-300 rounded-md" />
        </div>
        <div>
          <label className="block font-semibold">Faixa Salarial:</label>
          <input type="text" name="faixaSalarial" value={vaga.faixaSalarial} onChange={handleInputChange} className="w-full p-2 border border-gray-300 rounded-md" />
        </div>
        <div>
          <label className="block font-semibold">Início Previsto:</label>
          <input type="text" name="inicioPrevisto" value={vaga.inicioPrevisto} onChange={handleInputChange} className="w-full p-2 border border-gray-300 rounded-md" />
        </div>
        <button type="submit" className="w-full bg-green-500 text-white p-2 rounded-md hover:bg-green-600 transition">
          Criar Vaga
        </button>
      </form>
    </div>
  );
}

