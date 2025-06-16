'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import PainelWrapper from '../../../components/PainelWrapper';

interface Vaga {
  id: string;
  titulo: string;
  descricao: string;
  cidade: string;
  estado: string;
  salario: string;
}

export default function PainelVagas() {
  const router = useRouter();
  const [vagas, setVagas] = useState<Vaga[]>([]);

  useEffect(() => {
    const fetchVagas = async () => {
      try {
        const response = await fetch('/api/vagas-do-usuario');
        if (response.ok) {
          const data: Vaga[] = await response.json();
          setVagas(data);
        } else {
          console.error('Erro ao buscar vagas:', await response.json());
        }
      } catch (error) {
        console.error('Erro ao buscar vagas:', error);
      }
    };

    fetchVagas();
  }, []);

  const handleEditar = (id: string) => {
    router.push(`/painel/vagas/editar/${id}`);
  };

  const handleExcluir = async (id: string) => {
    if (confirm('Tem certeza que deseja excluir esta vaga?')) {
      try {
        const response = await fetch(`/api/deletar-vaga/${id}`, {
          method: 'DELETE',
        });

        if (response.ok) {
          alert('Vaga excluída com sucesso!');
          setVagas(vagas.filter((vaga) => vaga.id !== id));
        } else {
          alert('Erro ao excluir a vaga.');
        }
      } catch (error) {
        console.error('Erro ao excluir vaga:', error);
      }
    }
  };

  return (
    <PainelWrapper>
      <h1 className="text-2xl font-bold text-green-700 text-center mb-6">Minhas Vagas Publicadas</h1>

      {vagas.length > 0 ? (
        vagas.map((vaga) => (
          <div key={vaga.id} className="bg-white p-4 rounded shadow-md mb-4 space-y-2">
            <h2 className="text-lg font-semibold text-gray-800">{vaga.titulo}</h2>
            <p className="text-gray-600">{vaga.descricao}</p>
            <p className="text-gray-500">
              {vaga.cidade} - {vaga.estado}
            </p>
            <p className="text-green-700 font-bold">Salário: {vaga.salario}</p>

            <div className="flex gap-2 mt-2">
              <button
                onClick={() => handleEditar(vaga.id)}
                className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded"
              >
                Editar
              </button>
              <button
                onClick={() => handleExcluir(vaga.id)}
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded"
              >
                Excluir
              </button>
            </div>
          </div>
        ))
      ) : (
        <p className="text-center text-gray-700">Nenhuma vaga publicada até o momento.</p>
      )}
    </PainelWrapper>
  );
}
