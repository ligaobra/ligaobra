'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { v4 as uuidv4 } from 'uuid';

export default function CadastroTrabalhador() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    telefone: '',
    cidade: '',
    estado: '',
    areaAtuacao: '',
    disponivelViajar: false,
  });

  

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = () => {
    const { nome, email, telefone, cidade, estado, areaAtuacao } = formData;

    if (!nome || !email || !telefone || !cidade || !estado || !areaAtuacao) {
      alert('Preencha todos os campos obrigatórios.');
      return;
    }

    const novoTrabalhador = {
      id: uuidv4(),
      ...formData,
    };

    const lista = localStorage.getItem('trabalhadores');
    const trabalhadores = lista ? JSON.parse(lista) : [];

    trabalhadores.push(novoTrabalhador);
    localStorage.setItem('trabalhadores', JSON.stringify(trabalhadores));

    alert('Cadastro realizado com sucesso!');
    router.push('/login');
  };

  return (
    <div className="max-w-lg mx-auto mt-10 p-4 border rounded shadow">
      <h2 className="text-2xl font-bold mb-6">Cadastro de Trabalhador</h2>

      <input
        type="text"
        name="nome"
        placeholder="Nome completo"
        value={formData.nome}
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
      <input
        type="text"
        name="areaAtuacao"
        placeholder="Área de atuação (ex: Pedreiro, Carpinteiro...)"
        value={formData.areaAtuacao}
        onChange={handleChange}
        className="mb-3 w-full border p-2 rounded"
      />

      <label className="flex items-center mb-4">
        <input
          type="checkbox"
          name="disponivelViajar"
          checked={formData.disponivelViajar}
          onChange={handleChange}
          className="mr-2"
        />
        Disponível para viajar
      </label>

      <Button onClick={handleSubmit} className="w-full">
        Cadastrar
      </Button>
    </div>
  );
}
