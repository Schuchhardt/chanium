import "server-only";
import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";
import { env } from "./env";

type Limiter = (key: string) => Promise<{ success: boolean }>;

const memory = new Map<string, number[]>();

/** Fallback when Upstash isn't configured: sliding window per serverless instance. */
function memoryLimiter(limit: number, windowMs: number): Limiter {
  return async (key) => {
    const now = Date.now();
    const hits = (memory.get(key) ?? []).filter((t) => now - t < windowMs);
    hits.push(now);
    memory.set(key, hits);
    return { success: hits.length <= limit };
  };
}

const limiters = new Map<string, Limiter>();

export function rateLimiter(name: string, limit: number, windowSeconds: number): Limiter {
  const existing = limiters.get(name);
  if (existing) return existing;
  let limiter: Limiter;
  if (env.upstashUrl && env.upstashToken) {
    const rl = new Ratelimit({
      redis: new Redis({ url: env.upstashUrl, token: env.upstashToken }),
      limiter: Ratelimit.slidingWindow(limit, `${windowSeconds} s`),
      prefix: `rl:${name}`,
    });
    limiter = (key) => rl.limit(key);
  } else {
    const mem = memoryLimiter(limit, windowSeconds * 1000);
    limiter = (key) => mem(`${name}:${key}`);
  }
  limiters.set(name, limiter);
  return limiter;
}

export function clientIp(req: Request) {
  return req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || req.headers.get("x-real-ip") || "unknown";
}
