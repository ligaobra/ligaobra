'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';

export default function PainelTrabalhador() {
  const { id } = useParams();
  const router = useRouter();
  const [trabalhador, setTrabalhador] = useState<any>(null);

  useEffect(() => {
    const fetchTrabalhador = async () => {
      const response = await fetch(`/api/trabalhadores/${id}`);
      if (response.ok) {
        const data = await response.json();
        setTrabalhador(data);
      } else {
        alert('Erro ao carregar dados do trabalhador');
      }
    };

    fetchTrabalhador();
  }, [id]);

  const handleEdit = () => {
    router.push(`/painel/trabalhadores/editar/${id}`);
  };

  const handleDelete = async () => {
    if (confirm('Tem certeza que deseja excluir este cadastro?')) {
      const response = await fetch(`/api/trabalhadores/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        router.push('/painel/trabalhadores');
      } else {
        alert('Erro ao excluir cadastro');
      }
    }
  };

  if (!trabalhador) return <p className="text-white p-4">Carregando dados...</p>;

  return (
    <div
      className="w-full min-h-screen bg-cover bg-center"
      style={{ backgroundImage: "url('/images/background.png')" }}
    >
      {/* Cabeçalho */}
      <div className="flex items-center space-x-2 mt-4 ml-4">
        <Image src="/images/logo.png" alt="Logo LigaObra" width={100} height={100} />
        <span className="text-green-600 font-bold text-2xl">LigaObra</span>
      </div>

      {/* Painel */}
      <div className="flex items-center justify-center pt-10">
        <div className="bg-gray-600 p-6 rounded shadow-md w-full max-w-md text-white">
          <h1 className="text-2xl font-bold mb-6 text-center">Painel do Trabalhador</h1>

          <p><strong>Nome:</strong> {trabalhador.nome}</p>
          <p><strong>Profissão:</strong> {trabalhador.profissao}</p>
          <p><strong>Cidade:</strong> {trabalhador.cidade}</p>
          <p><strong>Estado:</strong> {trabalhador.estado}</p>
          <p><strong>Telefone:</strong> {trabalhador.telefone}</p>

          {/* Histórico ou outras interações futuras */}
          {trabalhador.historico?.length > 0 && (
            <div className="mt-4">
              <strong>Histórico:</strong>
              <ul className="list-disc list-inside text-sm mt-2">
                {trabalhador.historico.map((item: string, index: number) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Botões */}
          <div className="flex gap-4 mt-6">
            <button
              className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
              onClick={handleEdit}
            >
              Editar
            </button>
            <button
              className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded"
              onClick={handleDelete}
            >
              Excluir
            </button>
            <button
              className="bg-gray-700 hover:bg-gray-800 text-white px-4 py-2 rounded"
              onClick={() => router.push('/painel/trabalhadores')}
            >
              Voltar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
