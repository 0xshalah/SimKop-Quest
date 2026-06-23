import { createHmac, timingSafeEqual, randomUUID } from "node:crypto";

/**
 * Token sesi game ber-tanda tangan HMAC-SHA256.
 * Format: base64url(payloadJSON) + "." + base64url(hmac)
 * Tujuan: memastikan submit skor berasal dari sesi yang benar-benar dimulai
 * di server, dan membatasi masa berlaku (anti-replay).
 */

export interface SessionPayload {
  sid: string; // session id unik
  iat: number; // issued-at (epoch ms)
}

const TTL_MS = 1000 * 60 * 30; // 30 menit

function b64url(buf: Buffer): string {
  return buf.toString("base64url");
}

function sign(data: string, secret: string): string {
  return b64url(createHmac("sha256", secret).update(data).digest());
}

export function createSessionToken(secret: string, now = Date.now()): string {
  if (!secret) throw new Error("MISSING_SECRET");
  const payload: SessionPayload = { sid: randomUUID(), iat: now };
  const body = b64url(Buffer.from(JSON.stringify(payload)));
  const sig = sign(body, secret);
  return `${body}.${sig}`;
}

/** Verifikasi tanda tangan & masa berlaku. Mengembalikan payload atau null. */
export function verifySessionToken(
  token: string,
  secret: string,
  now = Date.now(),
): SessionPayload | null {
  if (!secret || typeof token !== "string") return null;
  const parts = token.split(".");
  if (parts.length !== 2) return null;
  const [body, sig] = parts as [string, string];

  const expected = sign(body, secret);
  const sigBuf = Buffer.from(sig);
  const expBuf = Buffer.from(expected);
  // timing-safe: panjang harus sama dulu agar tidak membocorkan info.
  if (sigBuf.length !== expBuf.length) return null;
  if (!timingSafeEqual(sigBuf, expBuf)) return null;

  let payload: SessionPayload;
  try {
    payload = JSON.parse(Buffer.from(body, "base64url").toString("utf8"));
  } catch {
    return null;
  }
  if (typeof payload?.iat !== "number" || typeof payload?.sid !== "string") return null;
  if (now - payload.iat > TTL_MS) return null; // kedaluwarsa
  if (payload.iat - now > 5000) return null; // token "dari masa depan" → tolak

  return payload;
}
