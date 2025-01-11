interface RateLimit {
  maxRequests: number;
  windowMs: number;
}

interface RateLimitTracker {
  count: number;
  resetTime: number;
}

class RateLimiter {
  private limits: Map<string, RateLimit> = new Map();
  private trackers: Map<string, RateLimitTracker> = new Map();

  constructor() {
    // Define default rate limits
    this.setLimit('post_creation', { maxRequests: 5, windowMs: 60000 }); // 5 posts per minute
    this.setLimit('post_reaction', { maxRequests: 30, windowMs: 60000 }); // 30 reactions per minute
    this.setLimit('comment_creation', { maxRequests: 10, windowMs: 60000 }); // 10 comments per minute
  }

  setLimit(action: string, limit: RateLimit) {
    this.limits.set(action, limit);
  }

  private getTracker(key: string): RateLimitTracker {
    const now = Date.now();
    let tracker = this.trackers.get(key);

    if (!tracker || now >= tracker.resetTime) {
      tracker = {
        count: 0,
        resetTime: now + (this.limits.get(key)?.windowMs || 60000)
      };
      this.trackers.set(key, tracker);
    }

    return tracker;
  }

  async checkLimit(userId: string, action: string): Promise<boolean> {
    const key = `${userId}:${action}`;
    const limit = this.limits.get(action);

    if (!limit) {
      console.warn(`No rate limit defined for action: ${action}`);
      return true;
    }

    const tracker = this.getTracker(key);

    if (tracker.count >= limit.maxRequests) {
      const waitTime = tracker.resetTime - Date.now();
      throw new Error(`Rate limit exceeded. Please wait ${Math.ceil(waitTime / 1000)} seconds.`);
    }

    tracker.count++;
    return true;
  }

  getRemainingRequests(userId: string, action: string): number {
    const key = `${userId}:${action}`;
    const limit = this.limits.get(action);
    const tracker = this.getTracker(key);

    if (!limit) return 0;
    return Math.max(0, limit.maxRequests - tracker.count);
  }

  getResetTime(userId: string, action: string): number {
    const key = `${userId}:${action}`;
    const tracker = this.getTracker(key);
    return tracker.resetTime;
  }
}

export const rateLimiter = new RateLimiter();
