import React from 'react';

export default function PainelWrapper({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="min-h-screen bg-cover bg-center flex flex-col items-start justify-start px-4 py-8"
      style={{ backgroundImage: "url('/images/obra-fundo.jpg')" }}
    >
      {/* Painel Central */}
      <div className="bg-gray-800 bg-opacity-80 p-4 sm:p-6 rounded-xl shadow-lg w-full max-w-3xl mx-auto">
        {children}
      </div>
    </div>
  );
}
