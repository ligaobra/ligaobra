'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';

interface Prestador {
  id: string;
  nomeEmpresa: string;
  cnpj: string;
  tipoServico: string;
  email: string;
  telefone: string;
  cidade: string;
  estado: string;
  atendeOutrasRegioes: boolean;
}

export default function EditarPrestador() {
  const router = useRouter();
  const [formData, setFormData] = useState<Prestador | null>(null);

  useEffect(() => {
    // Verifica se o usuário está logado e se é um prestador
    const usuarioString = localStorage.getItem('usuarioLogado');
    if (!usuarioString) {
      alert('Você precisa estar logado.');
      router.push('/login');
      return;
    }
    const user: { id: string; email: string; tipo: string } = JSON.parse(usuarioString);
    if (user.tipo !== 'prestador') {
      alert('Acesso não autorizado.');
      router.push('/login');
      return;
    }

    // Carrega os dados do prestador a partir do localStorage
    const prestadoresString = localStorage.getItem('prestadores');
    if (prestadoresString) {
      try {
        const prestadores: Prestador[] = JSON.parse(prestadoresString);
        const prestadorAtual = prestadores.find((p) => p.id === user.id);
        if (prestadorAtual) {
          setFormData(prestadorAtual);
        } else {
          alert('Dados do prestador não encontrados.');
        }
      } catch (error) {
        console.error('Erro ao carregar prestador:', error);
      }
    }
  }, [router]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    if (formData) {
      setFormData({
        ...formData,
        [name]: type === 'checkbox' ? checked : value,
      });
    }
  };

  const handleSubmit = () => {
    if (!formData) return;
    const { nomeEmpresa, cnpj, tipoServico, email, telefone, cidade, estado } = formData;
    if (!nomeEmpresa || !cnpj || !tipoServico || !email || !telefone || !cidade || !estado) {
      alert('Preencha todos os campos obrigatórios.');
      return;
    }
    
    // Atualiza os dados do prestador no localStorage
    const prestadoresString = localStorage.getItem('prestadores');
    if (prestadoresString) {
      try {
        let prestadores: Prestador[] = JSON.parse(prestadoresString);
        prestadores = prestadores.map((p) => (p.id === formData.id ? formData : p));
        localStorage.setItem('prestadores', JSON.stringify(prestadores));
        alert('Perfil atualizado com sucesso!');
        router.push('/painel-prestador');
      } catch (error) {
        console.error('Erro ao atualizar perfil:', error);
      }
    }
  };

  if (!formData) {
    return <p>Carregando informações...</p>;
  }

  return (
    <div className="max-w-lg mx-auto mt-10 p-4 border rounded shadow">
      <h2 className="text-2xl font-bold mb-6">Editar Perfil - Prestador de Serviço / Fornecedor</h2>

      <input
        type="text"
        name="nomeEmpresa"
        placeholder="Nome da empresa ou responsável"
        value={formData.nomeEmpresa}
        onChange={handleChange}
        className="mb-3 w-full border p-2 rounded"
      />
      <input
        type="text"
        name="cnpj"
        placeholder="CNPJ"
        value={formData.cnpj}
        onChange={handleChange}
        className="mb-3 w-full border p-2 rounded"
      />
      <input
        type="text"
        name="tipoServico"
        placeholder="Tipo de serviço ou segmento de negócio"
        value={formData.tipoServico}
        onChange={handleChange}
        className="mb-3 w-full border p-2 rounded"
      />
      <input
        type="email"
        name="email"
        placeholder="E-mail"
        value={formData.email}
        onChange={handleChange}
        className="mb-3 w-full border p-2 rounded"
      />
      <input
        type="tel"
        name="telefone"
        placeholder="Telefone"
        value={formData.telefone}
        onChange={handleChange}
        className="mb-3 w-full border p-2 rounded"
      />
      <input
        type="text"
        name="cidade"
        placeholder="Cidade"
        value={formData.cidade}
        onChange={handleChange}
        className="mb-3 w-full border p-2 rounded"
      />
      <input
        type="text"
        name="estado"
        placeholder="Estado"
        value={formData.estado}
        onChange={handleChange}
        className="mb-3 w-full border p-2 rounded"
      />
      <label className="flex items-center mb-4">
        <input
          type="checkbox"
          name="atendeOutrasRegioes"
          checked={formData.atendeOutrasRegioes}
          onChange={handleChange}
          className="mr-2"
        />
        Disponível para atender outras regiões
      </label>

      <Button onClick={handleSubmit} className="w-full">Salvar Alterações</Button>
    </div>
  );
}
