/** Server-only environment access. Every integration is optional so the site builds with none set. */
export const env = {
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || "https://chanium.com",
  supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL,
  supabaseServiceKey: process.env.SUPABASE_SERVICE_ROLE_KEY,
  anthropicKey: process.env.ANTHROPIC_API_KEY,
  resendKey: process.env.RESEND_API_KEY,
  quoteFrom: process.env.QUOTE_FROM_EMAIL || "Chanium <hello@chanium.com>",
  internalEmail: process.env.INTERNAL_NOTIFY_EMAIL || "hello@chanium.com",
  calUrl: process.env.CAL_BOOKING_URL,
  slackWebhook: process.env.SLACK_WEBHOOK_URL,
  upstashUrl: process.env.UPSTASH_REDIS_REST_URL,
  upstashToken: process.env.UPSTASH_REDIS_REST_TOKEN,
};
