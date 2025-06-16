'use client';

import { useState, useEffect } from 'react';
//import Link from 'next/link';
import Toast from '@/components/Toast';

interface Vaga {
  id: string;
  titulo: string;
  descricao: string;
  empresa: string;
  localizacao: string;
  contato: string;
}

export default function ListagemVagas() {
  const [vagas, setVagas] = useState<Vaga[]>([]);
  const [toastMsg, setToastMsg] = useState('');
  const [toastType, setToastType] = useState<'success' | 'error'>('success');

  useEffect(() => {
    async function carregarVagas() {
      try {
        const resposta = await fetch('/api/vagasprestador1');
        const dados = await resposta.json();
        setVagas(dados);
      } catch (erro) {
        console.error('Erro ao carregar vagas:', erro);
      }
    }

    carregarVagas();
  }, []);

  const handleDelete = async (id: string) => {
    const confirmado = confirm('Tem certeza que deseja excluir esta vaga?');
    if (!confirmado) return;

    try {
      const response = await fetch(`/api/vagasprestador/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setVagas((prev) => prev.filter((v) => v.id !== id));
        setToastType('success');
        setToastMsg('Vaga excluída com sucesso!');
      } else {
        setToastType('error');
        setToastMsg('Erro ao excluir vaga.');
      }
    } catch (error) {
      console.error('Erro ao excluir:', error);
      setToastType('error');
      setToastMsg('Erro inesperado ao excluir.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {toastMsg && (
        <Toast message={toastMsg} type={toastType} />
      )}

      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-blue-800 text-center">
          Vagas Disponíveis
        </h1>

        {vagas.length === 0 ? (
          <p className="text-center text-gray-600">Nenhuma vaga publicada até o momento.</p>
        ) : (
          <ul className="grid gap-6 md:grid-cols-2">
            {vagas.map((vaga) => (
              <li key={vaga.id} className="bg-white p-6 rounded-xl shadow-md">
                <h2 className="text-xl font-semibold text-blue-700 mb-2">{vaga.titulo}</h2>
                <p className="text-gray-700 mb-1">{vaga.descricao}</p>
                <p className="text-sm text-gray-500 mb-1">{vaga.empresa}</p>
                <p className="text-sm text-gray-500 mb-3">{vaga.localizacao}</p>

                <p className="text-green-700 font-medium mb-4">
                  Contato: {vaga.contato}
                </p>

                <div className="flex justify-between">
                  <a
                    href={`https://wa.me/${vaga.contato.replace(/\D/g, '')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
                  >
                    Candidatar-se via WhatsApp
                  </a>

                  <button
                    onClick={() => handleDelete(vaga.id)}
                    className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition"
                  >
                    Excluir
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
