interface AnalyticsEvent {
  type: string;
  userId: string;
  metadata?: Record<string, any>;
  timestamp: Date;
}

class AnalyticsService {
  private events: AnalyticsEvent[] = [];
  private batchSize: number = 10;
  private flushInterval: number = 5000; // 5 seconds

  constructor() {
    this.startAutoFlush();
  }

  private startAutoFlush() {
    setInterval(() => this.flush(), this.flushInterval);
  }

  track(type: string, userId: string, metadata?: Record<string, any>) {
    const event: AnalyticsEvent = {
      type,
      userId,
      metadata,
      timestamp: new Date()
    };

    this.events.push(event);

    if (this.events.length >= this.batchSize) {
      this.flush();
    }
  }

  private async flush() {
    if (this.events.length === 0) return;

    const eventsToSend = [...this.events];
    this.events = [];

    try {
      // Implement sending events to analytics backend
      console.log('Sending analytics events:', eventsToSend);
    } catch (error) {
      console.error('Failed to send analytics events:', error);
      // Retry logic could be implemented here
    }
  }

  // Predefined tracking methods
  trackPageView(userId: string, page: string) {
    this.track('page_view', userId, { page });
  }

  trackPostCreation(userId: string, postId: string) {
    this.track('post_created', userId, { postId });
  }

  trackPostEngagement(userId: string, postId: string, type: 'like' | 'comment' | 'share') {
    this.track('post_engagement', userId, { postId, type });
  }

  trackThemePurchase(userId: string, themeId: string) {
    this.track('theme_purchase', userId, { themeId });
  }

  trackAchievementUnlocked(userId: string, achievementId: string) {
    this.track('achievement_unlocked', userId, { achievementId });
  }
}

export const analytics = new AnalyticsService();
