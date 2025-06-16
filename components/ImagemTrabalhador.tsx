'use client';

import Image from 'next/image';

export default function ImagemTrabalhador() {
  return (
    <Image 
      src="/images/trabalhador.png"  
      alt="Trabalhador LigaObra"
      layout="fill"  
      objectFit="cover"  
      className="w-full h-full"
    />
  );
}
