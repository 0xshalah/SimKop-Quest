import { describe, it, expect } from "vitest";
import { RateLimiter } from "./ratelimit";

describe("RateLimiter", () => {
  it("mengizinkan hingga batas lalu memblokir", () => {
    const rl = new RateLimiter(3, 1000);
    const t = 1000;
    expect(rl.check("ip", t).allowed).toBe(true);
    expect(rl.check("ip", t).allowed).toBe(true);
    expect(rl.check("ip", t).allowed).toBe(true);
    const blocked = rl.check("ip", t);
    expect(blocked.allowed).toBe(false);
    expect(blocked.remaining).toBe(0);
  });

  it("mereset setelah window berakhir", () => {
    const rl = new RateLimiter(1, 1000);
    expect(rl.check("ip", 0).allowed).toBe(true);
    expect(rl.check("ip", 500).allowed).toBe(false);
    expect(rl.check("ip", 1000).allowed).toBe(true); // window baru
  });

  it("menghitung sisa kuota", () => {
    const rl = new RateLimiter(5, 1000);
    expect(rl.check("ip", 0).remaining).toBe(4);
    expect(rl.check("ip", 0).remaining).toBe(3);
  });

  it("memisahkan kuota antar key", () => {
    const rl = new RateLimiter(1, 1000);
    expect(rl.check("ip-a", 0).allowed).toBe(true);
    expect(rl.check("ip-b", 0).allowed).toBe(true);
    expect(rl.check("ip-a", 0).allowed).toBe(false);
  });

  it("sweep membersihkan bucket kedaluwarsa", () => {
    const rl = new RateLimiter(1, 1000);
    rl.check("ip", 0);
    rl.sweep(2000);
    // setelah sweep, key dianggap baru lagi
    expect(rl.check("ip", 2000).allowed).toBe(true);
  });
});
