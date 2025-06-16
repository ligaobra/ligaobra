"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function CadastrarVaga() {
  const [formData, setFormData] = useState({
    titulo: '',
    descricao: '',
    cidade: '',
    estado: '',
    tipoContrato: '',
    faixaSalarial: '',
    inicioPrevisto: ''
  });

  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await fetch('/api/vagas', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      alert('Vaga cadastrada com sucesso!');
      router.push('/painel/vagas/listar');
    } catch (error) {
      console.error('Erro ao cadastrar vaga:', error);
    }
  };

  return (
    <div style={{ margin: '20px', maxWidth: '600px' }}>
      <h1>Cadastrar Vaga</h1>
      <form onSubmit={handleSubmit} style={{ display: 'grid', gap: '10px' }}>
        <input name="titulo" placeholder="Título" onChange={handleChange} required style={{ padding: '10px', border: '1px solid #ccc' }} />
        <textarea name="descricao" placeholder="Descrição" onChange={handleChange} required style={{ padding: '10px', border: '1px solid #ccc' }} />
        <input name="cidade" placeholder="Cidade" onChange={handleChange} required style={{ padding: '10px', border: '1px solid #ccc' }} />
        <input name="estado" placeholder="Estado" onChange={handleChange} required style={{ padding: '10px', border: '1px solid #ccc' }} />
        <input name="tipoContrato" placeholder="Tipo de Contrato" onChange={handleChange} required style={{ padding: '10px', border: '1px solid #ccc' }} />
        <input name="faixaSalarial" placeholder="Faixa Salarial" onChange={handleChange} required style={{ padding: '10px', border: '1px solid #ccc' }} />
        <input name="inicioPrevisto" placeholder="Início Previsto" onChange={handleChange} required style={{ padding: '10px', border: '1px solid #ccc' }} />
        <button type="submit" style={{ padding: '10px', backgroundColor: '#4CAF50', color: 'white', border: 'none' }}>Cadastrar Vaga</button>
      </form>
    </div>
  );
}
