import { describe, it, expect } from "vitest";
import { createSessionToken, verifySessionToken } from "./session";

const SECRET = "super-secret-key-for-testing-only-123456";

describe("session token (HMAC anti-cheat)", () => {
  it("membuat token yang bisa diverifikasi", () => {
    const token = createSessionToken(SECRET);
    const payload = verifySessionToken(token, SECRET);
    expect(payload).not.toBeNull();
    expect(typeof payload?.sid).toBe("string");
    expect(typeof payload?.iat).toBe("number");
  });

  it("menghasilkan sid unik tiap sesi", () => {
    const a = verifySessionToken(createSessionToken(SECRET), SECRET);
    const b = verifySessionToken(createSessionToken(SECRET), SECRET);
    expect(a?.sid).not.toBe(b?.sid);
  });

  it("menolak tanda tangan yang dipalsukan", () => {
    const token = createSessionToken(SECRET);
    const tampered = token.slice(0, -2) + (token.endsWith("aa") ? "bb" : "aa");
    expect(verifySessionToken(tampered, SECRET)).toBeNull();
  });

  it("menolak secret berbeda", () => {
    const token = createSessionToken(SECRET);
    expect(verifySessionToken(token, "secret-lain-yang-berbeda-total")).toBeNull();
  });

  it("menolak format tidak valid", () => {
    expect(verifySessionToken("tanpa-titik", SECRET)).toBeNull();
    expect(verifySessionToken("a.b.c", SECRET)).toBeNull();
  });

  it("menolak token kedaluwarsa", () => {
    const past = Date.now() - 1000 * 60 * 31; // 31 menit lalu (TTL 30 mnt)
    const token = createSessionToken(SECRET, past);
    expect(verifySessionToken(token, SECRET)).toBeNull();
  });

  it("menolak token dari masa depan", () => {
    const future = Date.now() + 1000 * 60; // 1 menit ke depan
    const token = createSessionToken(SECRET, future);
    expect(verifySessionToken(token, SECRET)).toBeNull();
  });

  it("menolak secret kosong", () => {
    expect(() => createSessionToken("")).toThrow("MISSING_SECRET");
    expect(verifySessionToken("a.b", "")).toBeNull();
  });
});
