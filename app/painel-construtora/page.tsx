'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';

// Tipo local para Vaga
type Vaga = {
  id: string;
  titulo: string;
  descricao: string;
  cidade: string;
  estado: string;
  contato: string;
  idConstrutora: string;
};

// Tipo local para Construtora
type Construtora = {
  id: string;
  nome: string;
  email: string;
  cidade: string;
  estado: string;
};

export default function PainelConstrutora() {
  const router = useRouter();
  const [construtora, setConstrutora] = useState<Construtora | null>(null);
  const [vagas, setVagas] = useState<Vaga[]>([]);

  useEffect(() => {
    const dadosSalvos = localStorage.getItem('construtora');

    if (dadosSalvos) {
      const dados = JSON.parse(dadosSalvos);
      setConstrutora(dados);

      fetch('/vagas-publicadas.json')
        .then(res => res.json())
        .then((data: Vaga[]) => {
          const vagasFiltradas = data.filter(
            (vaga) => vaga.idConstrutora === dados.id
          );
          setVagas(vagasFiltradas);
        })
        .catch(() => toast.error('Erro ao carregar vagas.'));
    } else {
      toast.error('Acesso negado! Faça login novamente.');
      router.push('/login');
    }
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('construtora');
    toast.success('Logout realizado com sucesso!');
    router.push('/');
  };

  if (!construtora) return null;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Painel da Construtora</h1>

      <div className="mb-6">
        <p><strong>Nome:</strong> {construtora.nome}</p>
        <p><strong>E-mail:</strong> {construtora.email}</p>
        <p><strong>Cidade:</strong> {construtora.cidade}</p>
        <p><strong>Estado:</strong> {construtora.estado}</p>
      </div>

      <h2 className="text-xl font-semibold mb-2">Vagas Publicadas</h2>
      {vagas.length === 0 ? (
        <p>Nenhuma vaga publicada ainda.</p>
      ) : (
        vagas.map((vaga) => (
          <div key={vaga.id} className="mb-4 p-4 border rounded shadow">
            <h3 className="font-bold">{vaga.titulo}</h3>
            <p>{vaga.descricao}</p>
            <p><strong>Cidade:</strong> {vaga.cidade} - {vaga.estado}</p>
            <p><strong>Contato:</strong> {vaga.contato}</p>
          </div>
        ))
      )}

      <button
        onClick={handleLogout}
        className="mt-6 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
      >
        Sair
      </button>
    </div>
  );
}
