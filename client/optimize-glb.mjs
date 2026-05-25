import fs from "fs/promises";
import path from "path";
import { execFileSync } from "child_process";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const inputBase = process.env.GLB_INPUT || path.resolve(__dirname, "public"); // client/public
const outputBase = process.env.GLB_OUTPUT || "blender-optim";
const shouldSkipExisting = process.env.GLB_SKIP_EXISTING !== "false";
const enableTexCompression = process.env.GLB_TEX_COMP !== "false";
const gltfpackArgs = enableTexCompression ? ["-cc", "-tc", "-kn"] : ["-cc", "-kn"];

async function pathExists(targetPath) {
  try {
    await fs.access(targetPath);
    return true;
  } catch {
    return false;
  }
}

function ensureGltfpack() {
  try {
    execFileSync("gltfpack", ["-v"], { stdio: "ignore" });
  } catch {
    console.error("❌ No se encontro `gltfpack` en PATH. Instalalo y vuelve a intentar.");
    process.exit(1);
  }
}

async function collectGlbFiles(dir, results = []) {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (entry.name === outputBase) continue;
      await collectGlbFiles(fullPath, results);
      continue;
    }
    if (path.extname(entry.name).toLowerCase() === ".glb") {
      results.push(fullPath);
    }
  }
  return results;
}

async function optimizeFile(inputPath) {
  const name = path.parse(inputPath).name;
  const relDir = path.relative(inputBase, path.dirname(inputPath));
  const outputDir = path.join(inputBase, outputBase, relDir);
  await fs.mkdir(outputDir, { recursive: true });

  const outputPath = path.join(outputDir, `${name}-opt.glb`);
  if (shouldSkipExisting && (await pathExists(outputPath))) {
    console.log(`⚠️ Ya existe: ${outputPath}`);
    return;
  }

  const runGltfpack = (args) => {
    try {
      execFileSync("gltfpack", args, { stdio: "inherit" });
      return { ok: true, stderr: "" };
    } catch (error) {
      const stderr = String(error?.stderr || "");
      const message = String(error?.message || "");
      return { ok: false, stderr: `${stderr}\n${message}` };
    }
  };

  const firstRun = runGltfpack(["-i", inputPath, "-o", outputPath, ...gltfpackArgs]);
  if (firstRun.ok) {
    console.log(`✅ GLB optimizado: ${outputPath}`);
    return;
  }

  const basisuMissing =
    firstRun.stderr.includes("BasisU") ||
    firstRun.stderr.includes("texture compression is not available");

  if (basisuMissing && gltfpackArgs.includes("-tc")) {
    console.warn("⚠️ gltfpack sin BasisU: reintentando sin -tc (sin compresion de texturas).");
    const retry = runGltfpack(["-i", inputPath, "-o", outputPath, "-cc", "-kn"]);
    if (retry.ok) {
      console.log(`✅ GLB optimizado (sin -tc): ${outputPath}`);
      return;
    }
  }

  throw new Error(firstRun.stderr.trim() || "gltfpack fallo.");
}

async function main() {
  if (!(await pathExists(inputBase))) {
    console.error(`❌ Carpeta base no encontrada: ${inputBase}`);
    process.exit(1);
  }

  ensureGltfpack();

  console.log(`📂 Buscando .glb en: ${inputBase}`);
  const glbFiles = await collectGlbFiles(inputBase);

  if (glbFiles.length === 0) {
    console.log("⚠️ No se encontraron archivos .glb");
    return;
  }

  for (const filePath of glbFiles) {
    await optimizeFile(filePath);
  }

  console.log("🎉 Optimizacion de GLB completada");
}

main().catch((err) => {
  console.error("❌ Error inesperado:", err);
  process.exit(1);
});
