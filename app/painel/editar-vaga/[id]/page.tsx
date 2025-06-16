'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';

export default function EditarVaga() {
  const router = useRouter();
  const params = useParams();
  const id = params.id?.toString() ?? '';


  const [vaga, setVaga] = useState({
    titulo: '',
    descricao: '',
    cidade: '',
    estado: '',
    tipoContrato: '',
    faixaSalarial: '',
    inicioPrevisto: '',
  });

  const handleDelete = async (id: string) => {

  const [vagas, setVagas] = useState([]);

useEffect(() => {
  async function fetchVagas() {
    const res = await fetch('/api/vagasprestador1');
    const data = await res.json();
    setVagas(data);
  }
  fetchVagas();
}, []);


  async function handleDelete(id: string) {
  const confirm = window.confirm('Tem certeza que deseja excluir esta vaga?');
  if (!confirm) return;

  const res = await fetch(`/api/vagasprestador1/${id}`, { method: 'DELETE' });
  if (res.ok) {
    setVagas(vagas.filter(v => v.id !== id));
    alert('Vaga excluída com sucesso!');
  } else {
    alert('Erro ao excluir a vaga.');
  }
}

    async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const response = await fetch(`/api/vagasprestador1/${id}`, {
  method: 'PUT',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(vaga),
});


    if (response.ok) {
      alert('Vaga atualizada com sucesso!');
      router.push('/painel/listagem-vagas');
    } else {
      alert('Erro ao atualizar vaga.');
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-2xl mx-auto bg-white p-6 rounded-xl shadow-md">
        <h1 className="text-3xl font-bold mb-6 text-center text-blue-800">Editar Vaga</h1>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4">
          <input
            value={vaga.titulo}
            onChange={e => setVaga({ ...vaga, titulo: e.target.value })}
            className="p-3 border border-gray-300 rounded"
            placeholder="Título da vaga"
          />

          <textarea
            value={vaga.descricao}
            onChange={e => setVaga({ ...vaga, descricao: e.target.value })}
            className="p-3 border border-gray-300 rounded"
            placeholder="Descrição da vaga"
            rows={4}
          />

          <div className="grid grid-cols-2 gap-4">
            <input
              value={vaga.cidade}
              onChange={e => setVaga({ ...vaga, cidade: e.target.value })}
              className="p-3 border border-gray-300 rounded"
              placeholder="Cidade"
            />
            <input
              value={vaga.estado}
              onChange={e => setVaga({ ...vaga, estado: e.target.value })}
              className="p-3 border border-gray-300 rounded"
              placeholder="Estado"
            />
          </div>

          <input
            value={vaga.tipoContrato}
            onChange={e => setVaga({ ...vaga, tipoContrato: e.target.value })}
            className="p-3 border border-gray-300 rounded"
            placeholder="Tipo de contrato"
          />

          <input
            value={vaga.faixaSalarial}
            onChange={e => setVaga({ ...vaga, faixaSalarial: e.target.value })}
            className="p-3 border border-gray-300 rounded"
            placeholder="Faixa salarial"
          />

          <input
            value={vaga.inicioPrevisto}
            onChange={e => setVaga({ ...vaga, inicioPrevisto: e.target.value })}
            className="p-3 border border-gray-300 rounded"
            placeholder="Início previsto"
          />

          <button
            type="submit"
            className="bg-blue-700 text-white font-semibold py-3 px-6 rounded hover:bg-blue-800 transition"
          >
            Salvar Alterações
          </button>
        </form>
      </div>
    </div>
  );
}
)