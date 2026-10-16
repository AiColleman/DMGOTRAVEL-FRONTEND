import { stat } from 'node:fs/promises';
const files = ['hero-huamanga','huamanga','millpu','quinua','wari','vilcashuaman','huanta','casona'];
for (const name of files) {
  const file = new URL(`../public/images/ayacucho/${name}.jpg`, import.meta.url);
  const info = await stat(file).catch(() => null);
  if (!info || info.size < 1000) throw new Error(`Falta la fotografía local ${name}.jpg. Restaura el archivo del repositorio.`);
}
console.log('8 fotografías locales verificadas; no se requiere red.');
