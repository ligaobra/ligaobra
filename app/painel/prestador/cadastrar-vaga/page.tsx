'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

export default function CadastrarVaga() {
  const router = useRouter();

  const [titulo, setTitulo] = useState('');
  const [descricao, setDescricao] = useState('');
  const [cidade, setCidade] = useState('');
  const [estado, setEstado] = useState('');
  const [tipoContrato, setTipoContrato] = useState('');
  const [faixaSalarial, setFaixaSalarial] = useState('');
  const [inicioPrevisto, setInicioPrevisto] = useState('');

  const handleCadastrar = async () => {
    const prestadorId = localStorage.getItem('idPrestador');

    if (!prestadorId) {
      toast.error('Prestador não identificado.');
      return;
    }

    try {
      const response = await fetch('/api/vaga', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          titulo,
          descricao,
          cidade,
          estado,
          tipoContrato,
          faixaSalarial,
          inicioPrevisto,
          prestadorId, // relacionamento no banco
        }),
      });

      if (!response.ok) {
        throw new Error('Erro ao cadastrar vaga');
      }

      toast.success('Vaga cadastrada com sucesso!');
      router.push('/painel/prestador'); // volta ao painel
    } catch (error) {
      console.error(error);
      toast.error('Erro ao cadastrar vaga!');
    }
  };

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4 text-center">Cadastrar Nova Vaga</h1>

      <div className="space-y-4">
        <input
          type="text"
          placeholder="Título"
          value={titulo}
          onChange={(e) => setTitulo(e.target.value)}
          className="w-full p-2 border rounded"
        />

        <textarea
          placeholder="Descrição"
          value={descricao}
          onChange={(e) => setDescricao(e.target.value)}
          className="w-full p-2 border rounded"
        />

        <input
          type="text"
          placeholder="Cidade"
          value={cidade}
          onChange={(e) => setCidade(e.target.value)}
          className="w-full p-2 border rounded"
        />

        <input
          type="text"
          placeholder="Estado"
          value={estado}
          onChange={(e) => setEstado(e.target.value)}
          className="w-full p-2 border rounded"
        />

        <input
          type="text"
          placeholder="Tipo de Contrato"
          value={tipoContrato}
          onChange={(e) => setTipoContrato(e.target.value)}
          className="w-full p-2 border rounded"
        />

        <input
          type="text"
          placeholder="Faixa Salarial"
          value={faixaSalarial}
          onChange={(e) => setFaixaSalarial(e.target.value)}
          className="w-full p-2 border rounded"
        />

        <input
          type="text"
          placeholder="Início Previsto"
          value={inicioPrevisto}
          onChange={(e) => setInicioPrevisto(e.target.value)}
          className="w-full p-2 border rounded"
        />

        <button
          onClick={handleCadastrar}
          className="w-full bg-green-600 text-white p-2 rounded hover:bg-green-700"
        >
          Publicar Vaga
        </button>

        <button
          onClick={() => router.push('/painel/prestador')}
          className="w-full mt-2 bg-gray-500 text-white p-2 rounded hover:bg-gray-600"
        >
          Voltar para o Painel
        </button>
      </div>
    </div>
  );
}
