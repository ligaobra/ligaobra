'use client';

import React, { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

interface Vaga {
  id: string;
  titulo: string;
  cidade: string;
  estado: string;
  tipoContrato: string;
  faixaSalarial: string;
  inicioPrevisto: string;
  descricao: string;
}

export default function EditarVaga() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const vagaId = searchParams.get('id');

  const [vaga, setVaga] = useState<Vaga | null>(null);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    const fetchVaga = async () => {
      if (!vagaId) return;
      
      try {
        console.log(`🔄 Buscando vaga com ID: ${vagaId}`);
        const response = await fetch(`/api/todas-vagas`);
        
        if (!response.ok) {
          throw new Error(`Erro: ${response.statusText}`);
        }

        const data: Vaga[] = await response.json();
        const vagaEncontrada = data.find(vaga => vaga.id === vagaId);

        if (vagaEncontrada) {
          setVaga(vagaEncontrada);
        } else {
          console.error('❌ Vaga não encontrada!');
        }

      } catch (error) {
        console.error("❌ Erro ao carregar a vaga:", error.message);
      } finally {
        setCarregando(false);
      }
    };

    fetchVaga();
  }, [vagaId]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (!vaga) return;
    const { name, value } = e.target;
    setVaga({ ...vaga, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch(`/api/editar-vaga/${vaga?.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(vaga),
      });

      if (response.ok) {
        alert('Vaga atualizada com sucesso!');
        router.push('/painel/vagas');
      } else {
        alert('Erro ao atualizar a vaga.');
      }
    } catch (error) {
      console.error("❌ Erro ao atualizar a vaga:", error.message);
    }
  };

  if (carregando) {
    return <p>Carregando dados da vaga...</p>;
  }

  if (!vaga) {
    return <p>Vaga não encontrada.</p>;
  }

  return (
    <div className="max-w-md mx-auto p-4 border border-gray-300 rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold mb-4">Editar Vaga</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-semibold">Título:</label>
          <input
            type="text"
            name="titulo"
            value={vaga.titulo}
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </div>
        <div>
          <label className="block font-semibold">Descrição:</label>
          <textarea
            name="descricao"
            value={vaga.descricao}
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </div>
        <div>
          <label className="block font-semibold">Cidade:</label>
          <input
            type="text"
            name="cidade"
            value={vaga.cidade}
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </div>
        <div>
          <label className="block font-semibold">Estado:</label>
          <input
            type="text"
            name="estado"
            value={vaga.estado}
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </div>
        <div>
          <label className="block font-semibold">Tipo de Contrato:</label>
          <input
            type="text"
            name="tipoContrato"
            value={vaga.tipoContrato}
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </div>
        <div>
          <label className="block font-semibold">Faixa Salarial:</label>
          <input
            type="text"
            name="faixaSalarial"
            value={vaga.faixaSalarial}
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </div>
        <div>
          <label className="block font-semibold">Início Previsto:</label>
          <input
            type="text"
            name="inicioPrevisto"
            value={vaga.inicioPrevisto}
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </div>
        <button
  type="button"
  onClick={async () => {
    const confirmar = confirm('Tem certeza que deseja excluir esta vaga?');
    if (confirmar) {
      try {
        const response = await fetch(`/api/deletar-vaga/${vaga?.id}`, {
          method: 'DELETE',
        });

        if (response.ok) {
          alert('Vaga excluída com sucesso!');
          router.push('/painel/vagas');
        } else {
          alert('Erro ao excluir a vaga.');
        }
      } catch (error) {
        console.error("❌ Erro ao excluir a vaga:", error.message);
      }
    }
  }}
  className="w-full bg-red-500 text-white p-2 rounded-md hover:bg-red-600 transition mt-2"
>
  Excluir Vaga
</button>
      </form>
    </div>
  );
}
