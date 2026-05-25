import sharp from "sharp";
import { promises as fs } from "fs";
import path from "path";

const inputBase = "/home/kenif/zincel-web-gsap/client/public";
const baseDirs = ["imagenes"];

const sizes = [768, 1280, 1920];
const outputBase = "imagenes-optim";

async function processFolder(folderPath) {
  try {
    const files = await fs.readdir(folderPath);
    for (const file of files) {
      const ext = path.extname(file).toLowerCase();
      if (![".jpg", ".jpeg", ".png", ".svg"].includes(ext)) continue;

      const inputPath = path.join(folderPath, file);
      const name = path.parse(file).name;
      const relPath = path.relative(inputBase, folderPath);
      const outputDir = path.join(inputBase, outputBase, relPath);
      await fs.mkdir(outputDir, { recursive: true });

      for (const size of sizes) {
        const outputWebp = path.join(outputDir, `${name}-${size}.webp`);
        const outputAvif = path.join(outputDir, `${name}-${size}.avif`);

        try {
          await fs.access(outputWebp);
        } catch {
          await sharp(inputPath).resize({ width: size }).webp({ quality: 82 }).toFile(outputWebp);
          console.log(`✅ WebP generado: ${outputWebp}`);
        }

        try {
          await fs.access(outputAvif);
        } catch {
          await sharp(inputPath)
            .resize({ width: size })
            .avif({ quality: 60, effort: 4 })
            .toFile(outputAvif);
          console.log(`✅ AVIF generado: ${outputAvif}`);
        }
      }
    }
  } catch (err) {
    console.error(`❌ Error procesando ${folderPath}:`, err.message);
  }
}

(async () => {
  for (const baseDir of baseDirs) {
    const fullPath = path.join(inputBase, baseDir);
    try {
      await fs.access(fullPath);
      console.log(`Procesando carpeta: ${fullPath}`);
      await processFolder(fullPath);
    } catch {
      console.warn(`⚠️ Carpeta no encontrada: ${fullPath}`);
    }
  }
  console.log("✅ Procesamiento completado.");
})();
