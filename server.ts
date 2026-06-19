import express from 'express';
import nodemailer from 'nodemailer';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

dotenv.config();

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname));

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: Number(process.env.EMAIL_PORT),
  secure: true,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

function row(label: string, value: string) {
  if (!value) return '';
  return `
    <tr>
      <td style="padding:10px 16px;font-size:12px;font-weight:600;color:#94a3b8;text-transform:uppercase;letter-spacing:1px;white-space:nowrap;border-bottom:1px solid #1e1b4b;width:200px;">${label}</td>
      <td style="padding:10px 16px;font-size:14px;color:#e2e8f0;border-bottom:1px solid #1e1b4b;">${value}</td>
    </tr>`;
}

function section(title: string, rows: string) {
  return `
    <div style="margin-bottom:32px;">
      <div style="background:linear-gradient(90deg,#7c3aed,#ec4899);padding:10px 20px;border-radius:10px 10px 0 0;">
        <span style="font-size:13px;font-weight:700;color:#fff;letter-spacing:2px;text-transform:uppercase;">${title}</span>
      </div>
      <table style="width:100%;border-collapse:collapse;background:#0f0c24;border-radius:0 0 10px 10px;overflow:hidden;">
        ${rows}
      </table>
    </div>`;
}

app.post('/api/briefing', async (req, res) => {
  const d = req.body;

  const html = `
  <!DOCTYPE html>
  <html>
  <head><meta charset="UTF-8"/></head>
  <body style="margin:0;padding:0;background:#060510;font-family:Arial,sans-serif;">
    <div style="max-width:700px;margin:0 auto;padding:40px 20px;">

      <div style="text-align:center;margin-bottom:40px;">
        <div style="display:inline-block;background:linear-gradient(135deg,#7c3aed,#ec4899);border-radius:14px;padding:14px 20px;margin-bottom:16px;">
          <span style="font-size:28px;font-weight:900;color:#fff;font-family:sans-serif;">Z</span>
        </div>
        <h1 style="color:#fff;font-size:26px;margin:0 0 6px;">Nuevo Briefing de Proyecto</h1>
        <p style="color:#94a3b8;font-size:14px;margin:0;">Recibido el ${new Date().toLocaleDateString('es-PE', { day: '2-digit', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit' })}</p>
      </div>

      ${section('01 · Datos de la Empresa', `
        ${row('Empresa', d.empresa)}
        ${row('Contacto', d.contacto)}
        ${row('Cargo', d.cargo)}
        ${row('Teléfono', d.telefono)}
        ${row('Correo', d.correo)}
        ${row('Web actual', d.web)}
        ${row('Sector', d.sector)}
        ${row('Ubicación', d.ubicacion)}
        ${row('Descripción', d.descripcion)}
      `)}

      ${section('02 · Tipo de Proyecto', `
        ${row('Servicios', d.servicios)}
        ${row('Proyecto anterior', d.proyecto_anterior)}
      `)}

      ${section('03 · Objetivos', `
        ${row('Objetivo principal', d.objetivo)}
        ${row('Problemas a resolver', d.problemas)}
        ${row('Medición de éxito', d.exito)}
      `)}

      ${section('04 · Público Objetivo', `
        ${row('Cliente ideal', d.cliente_ideal)}
        ${row('Ubicación cliente', d.ubicacion_cliente)}
        ${row('Tipo de cliente', d.tipo_cliente)}
        ${row('Competidores', d.competidores)}
      `)}

      ${section('05 · Estilo Visual', `
        ${row('Tono', d.tono)}
        ${row('Identidad visual', d.identidad)}
        ${row('Referencias', d.referencias)}
        ${row('Colores preferidos', d.colores_si)}
        ${row('Colores NO', d.colores_no)}
      `)}

      ${section('06 · Alcance', `
        ${row('Páginas requeridas', d.paginas)}
        ${row('Funcionalidades', d.funcionalidades)}
        ${row('Funcionalidades especiales', d.funcionalidades_desc)}
      `)}

      ${section('07 · Plazos y Presupuesto', `
        ${row('Urgencia', d.urgencia)}
        ${row('Fecha límite', d.fecha_limite)}
        ${row('Presupuesto', d.presupuesto)}
      `)}

      ${section('08 · Información Adicional', `
        ${row('Notas', d.notas)}
        ${row('¿Cómo nos encontró?', d.como)}
        ${row('Agencia anterior', d.agencia_previa)}
        ${row('¿Qué no funcionó?', d.agencia_problema)}
      `)}

      <div style="text-align:center;margin-top:40px;padding:20px;border-top:1px solid #1e1b4b;">
        <p style="color:#475569;font-size:12px;margin:0;">ZINCEL Ideas Globales · www.zincelideas.com</p>
      </div>
    </div>
  </body>
  </html>`;

  try {
    await transporter.sendMail({
      from: `"Briefing Zincel" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_TO,
      replyTo: d.correo || process.env.EMAIL_USER,
      subject: `📋 Nuevo Briefing — ${d.empresa || 'Sin nombre'} (${d.sector || 'Sin sector'})`,
      html,
    });
    res.json({ ok: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ ok: false, error: 'Error al enviar el correo' });
  }
});

app.get('/briefing', (_req, res) => {
  res.sendFile(path.join(__dirname, 'briefing.html'));
});

const PORT = Number(process.env.PORT) || 3000;
app.listen(PORT, () => {
  console.log(`Servidor en http://localhost:${PORT}`);
  console.log(`Briefing en http://localhost:${PORT}/briefing`);
});
