'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import PainelWrapper from '../../components/PainelWrapper';

interface Vaga {
  id: string;
  titulo: string;
  descricao: string;
  cidade: string;
  estado: string;
  salario: string;
}

export default function Candidatar() {
  const router = useRouter();
  const params = useParams();
  const { id } = params;

  const [vaga, setVaga] = useState<Vaga | null>(null);
  const [nome, setNome] = useState('');
  const [telefone, setTelefone] = useState('');

  useEffect(() => {
    const fetchVaga = async () => {
      try {
        const response = await fetch(`/api/vagas-publicadas/${id}`);
        if (response.ok) {
          const data: Vaga = await response.json();
          setVaga(data);
        } else {
          console.error('Erro ao buscar vaga:', await response.json());
        }
      } catch (error) {
        console.error('Erro ao buscar vaga:', error);
      }
    };

    fetchVaga();
  }, [id]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Candidatura enviada com sucesso!\nNome: ${nome}\nTelefone: ${telefone}`);
    router.push('/vagas');
  };

  return (
    <PainelWrapper>
      <h1 className="text-2xl font-bold text-green-700 text-center mb-4">Candidatar-se à Vaga</h1>

      {vaga ? (
        <div className="space-y-2 text-gray-800 mb-6">
          <p><strong>Vaga:</strong> {vaga.titulo}</p>
          <p><strong>Descrição:</strong> {vaga.descricao}</p>
          <p><strong>Local:</strong> {vaga.cidade} - {vaga.estado}</p>
          <p><strong>Salário:</strong> {vaga.salario}</p>
        </div>
      ) : (
        <p>Carregando detalhes da vaga...</p>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Seu Nome"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          className="border border-gray-300 rounded px-4 py-2 w-full"
          required
        />

        <input
          type="text"
          placeholder="Telefone para contato"
          value={telefone}
          onChange={(e) => setTelefone(e.target.value)}
          className="border border-gray-300 rounded px-4 py-2 w-full"
          required
        />

        <button
          type="submit"
          className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded w-full"
        >
          Enviar Candidatura
        </button>
      </form>

      <button
        onClick={() => router.push('/vagas')}
        className="mt-4 text-green-700 hover:underline w-full text-center"
      >
        Voltar para Vagas
      </button>
    </PainelWrapper>
  );
}
