import { mkdir, stat, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";

const assets = [
  { file: "hero-huamanga.jpg", source: "PLAZA MAYOR DE AYACUCHO.jpg", width: 1800 },
  { file: "huamanga.jpg", source: "PLAZA MAYOR DE AYACUCHO.jpg", width: 1400 },
  { file: "millpu.jpg", source: "Aguas Turquesas de Millpu.jpg", width: 1400 },
  { file: "quinua.jpg", source: "Pampa de la Quinua.jpg", width: 1400 },
  { file: "wari.jpg", source: "Ruinas Wari en Ayacucho, Peru.jpg", width: 1400 },
  { file: "vilcashuaman.jpg", source: "Vilcashuamán - Ayacucho - Perú.jpg", width: 1400 },
  { file: "huanta.jpg", source: "Razuhuillca olvido.jpg", width: 1200 },
  { file: "casona.jpg", source: "Casona Bosa y Solís, Ayacucho, Perú.jpg", width: 1400 },
];

const root = join(process.cwd(), "public", "images", "ayacucho");

async function exists(path) {
  try {
    const info = await stat(path);
    return info.size > 10_000;
  } catch {
    return false;
  }
}

async function download(asset) {
  const destination = join(root, asset.file);
  if (await exists(destination)) return;

  await mkdir(dirname(destination), { recursive: true });
  const source = encodeURIComponent(asset.source);
  const url = `https://commons.wikimedia.org/wiki/Special:Redirect/file/${source}?width=${asset.width}`;
  const response = await fetch(url, {
    redirect: "follow",
    headers: {
      "User-Agent": "DMGOTRAVEL-Frontend/1.0 (educational demo; local runtime assets)",
    },
  });

  if (!response.ok) {
    throw new Error(`No se pudo descargar ${asset.file}: HTTP ${response.status}`);
  }

  const bytes = new Uint8Array(await response.arrayBuffer());
  if (bytes.byteLength < 10_000) {
    throw new Error(`Asset inválido o demasiado pequeño: ${asset.file}`);
  }
  await writeFile(destination, bytes);
  console.log(`✓ ${asset.file} (${Math.round(bytes.byteLength / 1024)} KB)`);
}

await Promise.all(assets.map(download));
