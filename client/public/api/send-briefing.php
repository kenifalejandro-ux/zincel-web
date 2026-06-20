<?php
header('Content-Type: application/json; charset=UTF-8');
header('Access-Control-Allow-Origin: https://zincelideas.com');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') { exit(0); }
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['ok' => false]);
    exit;
}

// ── Credenciales ──────────────────────────────────────
$SMTP_HOST        = 'smtp.gmail.com';
$SMTP_PORT        = 465; // SSL directo (más compatible con hosting compartido)
$SMTP_USER        = 'kenifalejandro@gmail.com';
$SMTP_PASS        = 'aqgmfbxnlsadcxvw';
$EMAIL_TO         = 'contacto@zincelideas.com';
$RECAPTCHA_SECRET = '6LfP0L8rAAAAAB0aapY5ZiuMiDGGvVdjwyHq6Fc9';
$RECAPTCHA_MIN    = 0.5; // score mínimo (0.0–1.0); bots suelen ser < 0.3

// ── Rate limiting por IP (máx 5 envíos / hora) ────────
$ip       = $_SERVER['HTTP_CF_CONNECTING_IP']   // Cloudflare
         ?? $_SERVER['HTTP_X_FORWARDED_FOR']
         ?? $_SERVER['REMOTE_ADDR']
         ?? 'unknown';
$ip       = preg_replace('/[^a-fA-F0-9.:,]/', '', $ip);
$ip       = explode(',', $ip)[0]; // primer IP en cadena proxy

$rateFile = sys_get_temp_dir() . '/briefing_rate_' . md5($ip) . '.json';
$now      = time();
$window   = 3600; // 1 hora
$maxHits  = 5;

$hits = [];
if (file_exists($rateFile)) {
    $hits = json_decode(file_get_contents($rateFile), true) ?: [];
}
$hits = array_filter($hits, fn($t) => $t > $now - $window);

if (count($hits) >= $maxHits) {
    http_response_code(429);
    echo json_encode(['ok' => false, 'error' => 'too_many_requests']);
    exit;
}

// ── Leer body ─────────────────────────────────────────
$raw  = file_get_contents('php://input');
$data = json_decode($raw, true);
if (!is_array($data)) {
    http_response_code(400);
    echo json_encode(['ok' => false, 'error' => 'invalid_body']);
    exit;
}

// ── Validar reCAPTCHA v3 ──────────────────────────────
$token = $data['recaptcha_token'] ?? '';
if (empty($token)) {
    http_response_code(400);
    echo json_encode(['ok' => false, 'error' => 'missing_captcha']);
    exit;
}

$verify = file_get_contents(
    'https://www.google.com/recaptcha/api/siteverify?' .
    http_build_query(['secret' => $RECAPTCHA_SECRET, 'response' => $token, 'remoteip' => $ip])
);
$rc = json_decode($verify, true);

if (!($rc['success'] ?? false) || ($rc['score'] ?? 0) < $RECAPTCHA_MIN || ($rc['action'] ?? '') !== 'briefing') {
    http_response_code(403);
    echo json_encode([
        'ok'      => false,
        'error'   => 'captcha_failed',
        'success' => $rc['success'] ?? null,
        'score'   => $rc['score']   ?? null,
        'action'  => $rc['action']  ?? null,
        'errors'  => $rc['error-codes'] ?? [],
    ]);
    exit;
}

// ── Validación mínima de campos ───────────────────────
$empresa = trim($data['empresa'] ?? '');
$correo  = trim($data['correo']  ?? '');
if ($empresa === '' || $correo === '' || !filter_var($correo, FILTER_VALIDATE_EMAIL)) {
    http_response_code(422);
    echo json_encode(['ok' => false, 'error' => 'missing_fields']);
    exit;
}

// Registrar hit DESPUÉS de pasar todas las validaciones
$hits[] = $now;
file_put_contents($rateFile, json_encode(array_values($hits)));

// ── Construir HTML del email ──────────────────────────
function row(string $label, string $value): string {
    if ($value === '') return '';
    $v = nl2br(htmlspecialchars($value, ENT_QUOTES, 'UTF-8'));
    return "
    <tr>
      <td style='padding:10px 16px;font-size:12px;font-weight:600;color:#94a3b8;text-transform:uppercase;letter-spacing:1px;white-space:nowrap;border-bottom:1px solid #1e1b4b;width:200px;'>{$label}</td>
      <td style='padding:10px 16px;font-size:14px;color:#e2e8f0;border-bottom:1px solid #1e1b4b;'>{$v}</td>
    </tr>";
}

function section(string $title, string $rows): string {
    return "
    <div style='margin-bottom:32px;'>
      <div style='background:linear-gradient(90deg,#7c3aed,#ec4899);padding:10px 20px;border-radius:10px 10px 0 0;'>
        <span style='font-size:13px;font-weight:700;color:#fff;letter-spacing:2px;text-transform:uppercase;'>{$title}</span>
      </div>
      <table style='width:100%;border-collapse:collapse;background:#0f0c24;border-radius:0 0 10px 10px;overflow:hidden;'>
        {$rows}
      </table>
    </div>";
}

$sector  = $data['sector']  ?? '';
$replyTo = filter_var($correo, FILTER_VALIDATE_EMAIL) ? $correo : $SMTP_USER;
$fecha   = (new DateTime('now', new DateTimeZone('America/Lima')))->format('d/m/Y H:i');

$html = '<!DOCTYPE html><html><head><meta charset="UTF-8"/></head>
<body style="margin:0;padding:0;background:#060510;font-family:Arial,sans-serif;">
<div style="max-width:700px;margin:0 auto;padding:40px 20px;">
  <div style="text-align:center;margin-bottom:40px;">
    <div style="display:inline-block;background:linear-gradient(135deg,#7c3aed,#ec4899);border-radius:14px;padding:14px 20px;margin-bottom:16px;">
      <span style="font-size:28px;font-weight:900;color:#fff;">Z</span>
    </div>
    <h1 style="color:#fff;font-size:26px;margin:0 0 6px;">Nuevo Briefing de Proyecto</h1>
    <p style="color:#94a3b8;font-size:14px;margin:0;">Recibido el ' . $fecha . '</p>
  </div>'

. section('01 · Datos de la Empresa',
    row('Empresa',    $data['empresa']    ?? '') .
    row('Contacto',   $data['contacto']   ?? '') .
    row('Cargo',      $data['cargo']      ?? '') .
    row('Teléfono',   $data['telefono']   ?? '') .
    row('Correo',     $correo) .
    row('Web actual', $data['web']        ?? '') .
    row('Sector',     $data['sector']     ?? '') .
    row('Ubicación',  $data['ubicacion']  ?? '') .
    row('Descripción',$data['descripcion']?? '')
)
. section('02 · Tipo de Proyecto',
    row('Servicios',         $data['servicios']         ?? '') .
    row('Proyecto anterior', $data['proyecto_anterior'] ?? '')
)
. section('03 · Objetivos',
    row('Objetivo principal', $data['objetivo']  ?? '') .
    row('Problemas',          $data['problemas'] ?? '') .
    row('Medición de éxito',  $data['exito']     ?? '')
)
. section('04 · Público Objetivo',
    row('Cliente ideal',     $data['cliente_ideal']     ?? '') .
    row('Ubicación cliente', $data['ubicacion_cliente'] ?? '') .
    row('Tipo de cliente',   $data['tipo_cliente']      ?? '') .
    row('Competidores',      $data['competidores']      ?? '')
)
. section('05 · Estilo Visual',
    row('Tono',               $data['tono']        ?? '') .
    row('Identidad visual',   $data['identidad']   ?? '') .
    row('Referencias',        $data['referencias'] ?? '') .
    row('Colores preferidos', $data['colores_si']  ?? '') .
    row('Colores NO',         $data['colores_no']  ?? '')
)
. section('06 · Alcance',
    row('Páginas requeridas',    $data['paginas']              ?? '') .
    row('Funcionalidades',       $data['funcionalidades']      ?? '') .
    row('Funcionalidades desc.', $data['funcionalidades_desc'] ?? '')
)
. section('07 · Plazos y Presupuesto',
    row('Urgencia',     $data['urgencia']     ?? '') .
    row('Fecha límite', $data['fecha_limite'] ?? '') .
    row('Presupuesto',  $data['presupuesto']  ?? '')
)
. section('08 · Información Adicional',
    row('Notas',               $data['notas']            ?? '') .
    row('¿Cómo nos encontró?', $data['como']             ?? '') .
    row('Agencia anterior',    $data['agencia_previa']   ?? '') .
    row('¿Qué no funcionó?',   $data['agencia_problema'] ?? '')
)
. '
  <div style="text-align:center;margin-top:40px;padding:20px;border-top:1px solid #1e1b4b;">
    <p style="color:#475569;font-size:12px;margin:0;">ZINCEL Ideas Globales · www.zincelideas.com</p>
  </div>
</div></body></html>';

// ── Envío SMTP (Gmail SSL puerto 465) ─────────────────
function smtp_send(string $host, int $port, string $user, string $pass,
                   string $from, string $to, string $replyTo,
                   string $subject, string $html): array
{
    $ctx  = stream_context_create(['ssl' => [
        'verify_peer'       => true,
        'verify_peer_name'  => true,
        'allow_self_signed' => false,
    ]]);
    $sock = @stream_socket_client("ssl://{$host}:{$port}", $errno, $errstr, 15, STREAM_CLIENT_CONNECT, $ctx);
    if (!$sock) return [false, "connect_failed: {$errstr} ({$errno})"];
    stream_set_timeout($sock, 15);

    $log  = [];
    $r    = function() use ($sock, &$log) {
        $line = fgets($sock, 512);
        $log[] = 'S: ' . trim($line);
        return $line;
    };
    $w    = function(string $cmd) use ($sock, &$log) {
        $log[] = 'C: ' . (str_starts_with($cmd, base64_encode('')) ? '***' : trim($cmd));
        fwrite($sock, $cmd . "\r\n");
    };

    $r(); // banner
    $w("EHLO zincelideas.com"); while (($line = $r()) && substr($line, 3, 1) === '-');
    $w("AUTH LOGIN"); $r();
    $w(base64_encode($user)); $r();
    $w(base64_encode($pass));
    $authResp = $r();
    if (!str_starts_with(trim($authResp), '235')) {
        fclose($sock);
        return [false, "auth_failed: " . trim($authResp)];
    }

    $w("MAIL FROM:<{$from}>"); $r();
    $w("RCPT TO:<{$to}>");
    $rcptResp = $r();
    if (!str_starts_with(trim($rcptResp), '250')) {
        fclose($sock);
        return [false, "rcpt_failed: " . trim($rcptResp)];
    }
    $w("DATA"); $r();

    $msg  = "From: \"Briefing Zincel\" <{$from}>\r\n";
    $msg .= "To: {$to}\r\n";
    $msg .= "Reply-To: {$replyTo}\r\n";
    $msg .= "Subject: =?UTF-8?B?" . base64_encode($subject) . "?=\r\n";
    $msg .= "MIME-Version: 1.0\r\n";
    $msg .= "Content-Type: text/html; charset=UTF-8\r\n";
    $msg .= "Content-Transfer-Encoding: base64\r\n\r\n";
    $msg .= chunk_split(base64_encode($html)) . "\r\n.\r\n";
    fwrite($sock, $msg);
    $dataResp = $r();
    $w("QUIT"); fclose($sock);

    if (!str_starts_with(trim($dataResp), '250')) {
        return [false, "data_failed: " . trim($dataResp)];
    }
    return [true, ''];
}

$subject = "📋 Nuevo Briefing — {$empresa} ({$sector})";
[$ok, $smtpErr] = smtp_send($SMTP_HOST, $SMTP_PORT, $SMTP_USER, $SMTP_PASS,
                             $SMTP_USER, $EMAIL_TO, $replyTo, $subject, $html);

if (!$ok) {
    error_log("[briefing] smtp_error: {$smtpErr}");
}

echo json_encode(['ok' => $ok]);
