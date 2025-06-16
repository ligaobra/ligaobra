'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from './ui/button'; // Caminho corrigido

export default function CadastroVaga() {
  const [formData, setFormData] = useState({
    titulo: '',
    descricao: '',
    cidade: '',
    estado: '',
    tipoContrato: '',
    faixaSalarial: '',
    inicioPrevisto: '',
    aceitaOutrasRegioes: false,
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};
    if (!formData.titulo.trim()) newErrors.titulo = 'O título é obrigatório.';
    if (!formData.descricao.trim()) newErrors.descricao = 'A descrição é obrigatória.';
    if (!formData.cidade.trim()) newErrors.cidade = 'A cidade é obrigatória.';
    if (!formData.estado.trim()) newErrors.estado = 'O estado é obrigatório.';
    if (!formData.tipoContrato.trim()) newErrors.tipoContrato = 'O tipo de contrato é obrigatório.';
    if (!formData.faixaSalarial.trim()) newErrors.faixaSalarial = 'A faixa salarial é obrigatória.';
    if (!formData.inicioPrevisto.trim()) newErrors.inicioPrevisto = 'Informe a data de início.';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (validateForm()) {
      const vagasExistentesString = localStorage.getItem('vagas');
      const vagasExistentes = vagasExistentesString ? JSON.parse(vagasExistentesString) : [];

      const novasVagas = [...vagasExistentes, formData];
      localStorage.setItem('vagas', JSON.stringify(novasVagas));

      alert('Vaga cadastrada com sucesso!');
      setFormData({
        titulo: '',
        descricao: '',
        cidade: '',
        estado: '',
        tipoContrato: '',
        faixaSalarial: '',
        inicioPrevisto: '',
        aceitaOutrasRegioes: false,
      });
      setErrors({});
    } else {
      alert('Por favor, preencha todos os campos obrigatórios.');
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-50 p-4">
      <section className="w-full max-w-xl bg-white p-8 rounded-md shadow-md">
        <h1 className="text-2xl font-bold text-[#2E7D32] mb-6 text-center">Cadastrar Nova Vaga</h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input
              name="titulo"
              placeholder="Título da vaga (ex: Pedreiro)"
              value={formData.titulo}
              onChange={handleChange}
              className="w-full border rounded p-2"
            />
            {errors.titulo && <p className="text-red-500 text-sm">{errors.titulo}</p>}
          </div>

          <div>
            <textarea
              name="descricao"
              placeholder="Descrição detalhada da vaga"
              value={formData.descricao}
              onChange={handleChange}
              className="w-full border rounded p-2"
            />
            {errors.descricao && <p className="text-red-500 text-sm">{errors.descricao}</p>}
          </div>

          <div>
            <input
              name="cidade"
              placeholder="Cidade da obra"
              value={formData.cidade}
              onChange={handleChange}
              className="w-full border rounded p-2"
            />
            {errors.cidade && <p className="text-red-500 text-sm">{errors.cidade}</p>}
          </div>

          <div>
            <input
              name="estado"
              placeholder="Estado"
              value={formData.estado}
              onChange={handleChange}
              className="w-full border rounded p-2"
            />
            {errors.estado && <p className="text-red-500 text-sm">{errors.estado}</p>}
          </div>

          <div>
            <select
              name="tipoContrato"
              value={formData.tipoContrato}
              onChange={handleChange}
              className="w-full border rounded p-2"
            >
              <option value="">Tipo de contrato</option>
              <option value="CLT">CLT</option>
              <option value="Freelancer">Freelancer</option>
              <option value="Temporário">Temporário</option>
            </select>
            {errors.tipoContrato && <p className="text-red-500 text-sm">{errors.tipoContrato}</p>}
          </div>

          <div>
            <input
              name="faixaSalarial"
              placeholder="Faixa salarial"
              value={formData.faixaSalarial}
              onChange={handleChange}
              className="w-full border rounded p-2"
            />
            {errors.faixaSalarial && <p className="text-red-500 text-sm">{errors.faixaSalarial}</p>}
          </div>

          <div>
            <input
              type="date"
              name="inicioPrevisto"
              value={formData.inicioPrevisto}
              onChange={handleChange}
              className="w-full border rounded p-2"
            />
            {errors.inicioPrevisto && <p className="text-red-500 text-sm">{errors.inicioPrevisto}</p>}
          </div>

          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              name="aceitaOutrasRegioes"
              checked={formData.aceitaOutrasRegioes}
              onChange={handleChange}
            />
            Aceita candidatos de outras regiões
          </label>

          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <Button
              type="submit"
              className="w-full bg-[#2E7D32] hover:bg-[#1B5E20] text-white py-2 px-4 rounded text-lg"
            >
              Cadastrar Vaga
            </Button>
          </motion.div>
        </form>
      </section>
    </main>
  );
}
