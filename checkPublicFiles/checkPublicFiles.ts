import fs from 'fs';
import path from 'path';

const publicFolder = path.join(process.cwd(), 'public');
const imageFolder = path.join(publicFolder, 'images');

const filesToCheck = [
  'favicon.ico',
  'images/ligaobra1.png',
  'images/trabalhador.png',
  'images/publiclogo192.png',
  'images/publiclogo512.png'
];

console.log("\n🔍 Verificando arquivos em /public...\n");

filesToCheck.forEach((file) => {
  const filePath = path.join(publicFolder, file);
  if (fs.existsSync(filePath)) {
    console.log(`✅ ${file} - OK`);
  } else {
    console.log(`❌ ${file} - NÃO ENCONTRADO`);
  }
});

console.log("\n📝 Verificação concluída.\n");

