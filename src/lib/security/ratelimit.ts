/**
 * Rate limiter fixed-window in-memory. Murni & deterministik (now diinject)
 * agar mudah diuji. Untuk produksi multi-instance, ganti store ke Redis/Upstash
 * dengan antarmuka yang sama.
 */

export interface RateLimitResult {
  allowed: boolean;
  remaining: number;
  resetAt: number;
}

interface Bucket {
  count: number;
  resetAt: number;
}

export class RateLimiter {
  private store = new Map<string, Bucket>();

  constructor(
    private readonly limit: number,
    private readonly windowMs: number,
  ) {}

  check(key: string, now = Date.now()): RateLimitResult {
    const bucket = this.store.get(key);

    if (!bucket || now >= bucket.resetAt) {
      const resetAt = now + this.windowMs;
      this.store.set(key, { count: 1, resetAt });
      return { allowed: true, remaining: this.limit - 1, resetAt };
    }

    if (bucket.count >= this.limit) {
      return { allowed: false, remaining: 0, resetAt: bucket.resetAt };
    }

    bucket.count += 1;
    return { allowed: true, remaining: this.limit - bucket.count, resetAt: bucket.resetAt };
  }

  /** Bersihkan bucket kedaluwarsa (panggil berkala untuk mencegah memory growth). */
  sweep(now = Date.now()): void {
    for (const [key, bucket] of this.store) {
      if (now >= bucket.resetAt) this.store.delete(key);
    }
  }

  reset(): void {
    this.store.clear();
  }
}

/** Limiter global untuk endpoint submit skor: 10 request / menit / IP. */
export const submitScoreLimiter = new RateLimiter(10, 60_000);
