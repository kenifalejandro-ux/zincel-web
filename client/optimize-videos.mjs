/** client/src/optimize-videos.mjs*/

import ffmpeg from "fluent-ffmpeg";
import { promises as fs } from "fs";
import path from "path";

const inputBase = "/home/kenif/zincel-web-gsap/client/public";
const outputBase = "videos-optim";

const baseDirs = ["video"];

const validExt = [".mp4", ".mov", ".avi", ".mkv", ".webm"];

const resolutions = [
  { width: 768, label: "768" },
  { width: 1280, label: "1280" },
  { width: 1920, label: "1920" },
];

async function optimizeVideo(inputPath, outputPath, width) {
  try {
    await fs.access(outputPath);
    console.log(`⚠️ Ya existe: ${outputPath}`);
    return;
  } catch {}

  return new Promise((resolve, reject) => {
    ffmpeg(inputPath)
      .outputOptions([
        "-map_metadata -1",
        "-movflags +faststart",
        "-pix_fmt yuv420p",
        "-profile:v high",
        "-level 4.1",
        "-preset medium",
        "-crf 27",
        "-r 30",
        "-an", // ❌ sin audio
      ])
      .videoCodec("libx264")
      .size(`${width}x?`)
      .output(outputPath)
      .on("end", () => {
        console.log(`✅ Video optimizado: ${outputPath}`);
        resolve();
      })
      .on("error", (err) => {
        console.error(`❌ Error: ${inputPath}`, err.message);
        reject(err);
      })
      .run();
  });
}

async function processFolder(folderPath) {
  const files = await fs.readdir(folderPath);

  for (const file of files) {
    const ext = path.extname(file).toLowerCase();
    if (!validExt.includes(ext)) continue;

    const name = path.parse(file).name;
    const relPath = path.relative(inputBase, folderPath);
    const outputDir = path.join(inputBase, outputBase, relPath);

    await fs.mkdir(outputDir, { recursive: true });

    const inputFile = path.join(folderPath, file);

    for (const { width, label } of resolutions) {
      const outputFile = path.join(outputDir, `${name}-${label}.mp4`);
      await optimizeVideo(inputFile, outputFile, width);
    }
  }
}

(async () => {
  for (const dir of baseDirs) {
    const fullPath = path.join(inputBase, dir);
    try {
      await fs.access(fullPath);
      console.log(`📂 Procesando: ${fullPath}`);
      await processFolder(fullPath);
    } catch {
      console.warn(`⚠️ Carpeta no encontrada: ${fullPath}`);
    }
  }

  console.log("🎉 Optimización de videos completada");
})();
