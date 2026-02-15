# AI Agent Configuration Reference

## Job Scraping Sources

### Recommended Job Boards (Free APIs)

1. **RemoteOK** - https://remoteok.com/api
   - No auth required
   - Updates hourly
   - Good for remote jobs

2. **We Work Remotely** - https://weworkremotely.com/remote-jobs
   - Web scraping (no official API)
   - High quality listings

3. **Remotive** - https://remotive.com/api
   - Free tier available
   - Tech-focused

4. **Adzuna** - https://developer.adzuna.com
   - Free API key
   - Global coverage

5. **GitHub Jobs** (Archive) - Community maintained alternatives exist

### Search Parameters

```typescript
const searchConfig = {
  keywords: ['react', 'next.js', 'typescript', 'frontend'],
  salary_min: 2000,
  salary_max: 3500,
  remote: true,
  experience: ['mid', 'junior'],
  locations: ['worldwide', 'africa', 'remote']
};
```

## OpenAI Scoring Configuration

### Model Selection

- **Recommended**: `gpt-4o-mini` (fast, cheap, accurate)
- **Alternative**: `gpt-3.5-turbo` (cheaper, less accurate)
- **Premium**: `gpt-4o` (most accurate, expensive)

### Scoring Weights

```typescript
const scoringWeights = {
  salary: 0.30,        // 30% - Most important
  tech_stack: 0.30,    // 30% - Critical match
  remote_type: 0.20,   // 20% - High priority
  experience: 0.10,    // 10% - Flexible
  company: 0.10        // 10% - Nice to have
};
```

### Your Profile (for AI scoring)

```typescript
const candidateProfile = {
  name: "Adewunmi",
  role: "Full-Stack AI Builder",
  
  salary: {
    min_monthly_usd: 2000,
    target_monthly_usd: 2500,
    max_monthly_usd: 3500,
    currency: "USD"
  },
  
  tech_stack: {
    primary: ["React", "Next.js", "TypeScript", "Tailwind CSS"],
    secondary: ["Node.js", "PostgreSQL", "Supabase", "AI/ML"],
    familiar: ["Python", "OpenAI", "Edge Functions"]
  },
  
  experience: {
    years: "2-4",
    level: "mid",
    specialization: "Internal business systems, Property operations"
  },
  
  work_preferences: {
    remote_type: "fully_remote",
    locations_preferred: ["worldwide"],
    locations_excluded: ["on-site", "hybrid"],
    timezone_flexibility: "high"
  },
  
  company_preferences: {
    size: ["startup", "scaleup", "enterprise"],
    industry: ["proptech", "saas", "fintech", "healthtech"],
    stage: ["series_a", "series_b", "profitable"]
  },
  
  deal_breakers: [
    "salary_below_2000",
    "not_remote",
    "senior_only",
    "no_equity"
  ]
};
```

## Email Configuration

### Email Schedule

- **Daily Digest**: 7:00 AM UTC (8:00 AM WAT Nigeria time)
- **Threshold**: Only send if high matches ≥ 1
- **Frequency**: Max 1 email per day

### Email Template Settings

```typescript
const emailConfig = {
  from_name: "AI Job Agent",
  from_email: "agent@adewunmi.podsystem.ng",
  to_email: "your-email@example.com",
  
  subject_template: "🎯 {count} High-Match Jobs Found ({score}%+)",
  
  include_sections: {
    summary: true,
    high_matches: true,     // 75%+
    good_matches: false,    // 50-74% (optional)
    stats: true,
    unsubscribe: false      // Since it's personal
  },
  
  styling: {
    primary_color: "#2563eb",
    font: "system-ui, -apple-system, sans-serif",
    max_width: "600px"
  }
};
```

## Cron Schedule Options

```bash
# Every day at 7 AM UTC
0 7 * * *

# Twice daily (7 AM and 7 PM UTC)
0 7,19 * * *

# Every 6 hours
0 */6 * * *

# Weekdays only at 8 AM UTC
0 8 * * 1-5

# Every Monday and Thursday at 9 AM UTC
0 9 * * 1,4
```

## Deduplication Strategy

```typescript
const deduplicationConfig = {
  // Unique identifier format
  external_id_format: "{source}_{job_id}_{timestamp}",
  
  // Match criteria (consider duplicate if ALL match)
  match_fields: [
    "title",           // Exact match
    "company",         // Exact match
    "location"         // Exact match
  ],
  
  // Fuzzy matching (optional)
  similarity_threshold: 0.85,  // 85% similar = duplicate
  
  // Time window
  dedupe_window_days: 30  // Consider duplicates within 30 days
};
```

## Error Handling

### Retry Configuration

```typescript
const retryConfig = {
  scraping: {
    max_retries: 3,
    backoff_seconds: [5, 15, 30],
    timeout_seconds: 30
  },
  
  scoring: {
    max_retries: 2,
    backoff_seconds: [3, 10],
    timeout_seconds: 60
  },
  
  email: {
    max_retries: 2,
    backoff_seconds: [10, 30],
    timeout_seconds: 10
  }
};
```

### Failure Actions

```typescript
const failureHandling = {
  scraping_fails: "continue_with_existing_jobs",
  scoring_fails: "skip_job_and_continue",
  email_fails: "log_and_retry_next_run",
  
  critical_failures: [
    "database_unreachable",
    "auth_invalid"
  ]
};
```

## Performance Optimization

### Rate Limiting

```typescript
const rateLimits = {
  scraping: {
    requests_per_minute: 10,
    delay_between_requests_ms: 6000
  },
  
  openai: {
    requests_per_minute: 60,  // Free tier: 3 RPM, Paid: 60+ RPM
    tokens_per_minute: 90000
  },
  
  email: {
    emails_per_day: 1
  }
};
```

### Batch Processing

```typescript
const batchConfig = {
  scraping: {
    max_jobs_per_run: 100,
    sources_parallel: 3  // Scrape 3 sources at once
  },
  
  scoring: {
    batch_size: 10,      // Score 10 jobs at a time
    delay_between_batches_ms: 2000
  }
};
```

## Data Retention

```typescript
const retentionPolicy = {
  jobs: {
    keep_days: 90,           // Keep jobs for 90 days
    archive_after_days: 30,  // Archive old jobs
    delete_rejected: true    // Delete jobs scored <30%
  },
  
  runs: {
    keep_count: 100,         // Keep last 100 runs
    keep_days: 30
  }
};
```

## Monitoring Alerts

### Alert Thresholds

```typescript
const alerts = {
  no_jobs_found: {
    threshold: 3,           // Alert if 3 consecutive runs find 0 jobs
    action: "email_admin"
  },
  
  high_error_rate: {
    threshold: 0.5,         // Alert if >50% of jobs fail scoring
    action: "pause_agent"
  },
  
  api_quota_exceeded: {
    threshold: 0.9,         // Alert at 90% quota usage
    action: "email_admin"
  }
};
```

## Testing Configuration

### Test Mode

```typescript
const testConfig = {
  enabled: true,
  mock_data: true,
  skip_email: true,
  log_level: "debug",
  
  test_jobs: [
    {
      title: "Test High Match",
      expected_score: 85
    },
    {
      title: "Test Low Match",
      expected_score: 35
    }
  ]
};
```

## Quick Commands

```bash
# Manual run
curl -X POST https://chwjguxldansjzauqqwz.supabase.co/functions/v1/make-server-1bf47000/agent/run \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_ANON_KEY" \
  -d '{"password": "YOUR_PASSWORD"}'

# Check stats
curl -X POST https://chwjguxldansjzauqqwz.supabase.co/functions/v1/make-server-1bf47000/agent/stats \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_ANON_KEY" \
  -d '{"password": "YOUR_PASSWORD"}'

# View jobs
curl -X POST https://chwjguxldansjzauqqwz.supabase.co/functions/v1/make-server-1bf47000/agent/jobs \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_ANON_KEY" \
  -d '{"password": "YOUR_PASSWORD"}'
```
