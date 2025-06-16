'use client';

export default function EditarVaga({ params }: { params: { id: string } }) {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">Editar Vaga</h1>
      <p>ID da vaga: {params.id}</p>
      {/* Formulário de edição vai aqui futuramente */}
    </div>
  );
}
