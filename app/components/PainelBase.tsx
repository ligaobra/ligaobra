'use client'

import Image from 'next/image'
import LogoLigaObra from './LogoLigaObra'

interface PainelBaseProps {
  children: React.ReactNode
}

export default function PainelBase({ children }: PainelBaseProps) {
  return (
    <div className="relative w-full h-screen flex flex-col justify-center items-center">
      {/* Fundo */}
      <div className="absolute inset-0 -z-10">
        <Image
          src="/images/obra-fundo.png"
          alt="Fundo de obra"
          fill
          className="object-cover w-full h-full"
          priority
        />
        <div className="absolute inset-0 bg-black/40 backdrop-blur-sm"></div>
      </div>

      {/* Logomarca */}
      <div className="absolute top-4 left-4">
        <LogoLigaObra />
      </div>

      {/* Painel */}
      <div className="bg-gray-600 bg-opacity-60 p-8 rounded-2xl shadow-lg w-[600px]">
        {children}
      </div>
    </div>
  )
}
