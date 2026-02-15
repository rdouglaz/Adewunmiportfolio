# AI Agent System Architecture

## System Flow Diagram

```
┌─────────────────────────────────────────────────────────────────────┐
│                         USER INTERFACE                              │
│  https://adewunmi.podsystem.ng/agent                               │
│                                                                     │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐          │
│  │  Stats   │  │  Jobs    │  │  Runs    │  │ Run Btn  │          │
│  │ Dashboard│  │  List    │  │ History  │  │ (Manual) │          │
│  └──────────┘  └──────────┘  └──────────┘  └──────────┘          │
└─────────────────────────────────────────────────────────────────────┘
                              ↓
                    ┌─────────────────┐
                    │   SUPABASE      │
                    │ Edge Functions  │
                    └─────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────────────┐
│                    AGENT ORCHESTRATOR                               │
│                  /agent/run (Entry Point)                          │
│                                                                     │
│  ┌──────────────────────────────────────────────────────────┐     │
│  │  Step 1: SCRAPE JOBS                                      │     │
│  │  ┌──────────┐  ┌──────────┐  ┌──────────┐               │     │
│  │  │ RemoteOK │  │   WWR    │  │ Remotive │  ...          │     │
│  │  └──────────┘  └──────────┘  └──────────┘               │     │
│  │      ↓              ↓              ↓                     │     │
│  │  ┌──────────────────────────────────────┐               │     │
│  │  │  Normalize & Deduplicate Jobs        │               │     │
│  │  └──────────────────────────────────────┘               │     │
│  └──────────────────────────────────────────────────────────┘     │
│                              ↓                                     │
│  ┌──────────────────────────────────────────────────────────┐     │
│  │  Step 2: INSERT NEW JOBS                                 │     │
│  │  ┌────────────────────────────────────┐                 │     │
│  │  │  Check if job exists (external_id) │                 │     │
│  │  │  If new → Insert into KV store     │                 │     │
│  │  │  If exists → Skip                  │                 │     │
│  │  └────────────────────────────────────┘                 │     │
│  └──────────────────────────────────────────────────────────┘     │
│                              ↓                                     │
│  ┌──────────────────────────────────────────────────────────┐     │
│  │  Step 3: SCORE JOBS (OpenAI)                             │     │
│  │  ┌────────────────────────────────────┐                 │     │
│  │  │  Get jobs where score = null       │                 │     │
│  │  │           ↓                        │                 │     │
│  │  │  For each job:                     │                 │     │
│  │  │    → Call OpenAI API               │                 │     │
│  │  │    → Get structured scoring        │                 │     │
│  │  │    → Update job with score         │                 │     │
│  │  └────────────────────────────────────┘                 │     │
│  │                                                           │     │
│  │  Scoring Dimensions:                                     │     │
│  │  • Salary Match (30%)                                    │     │
│  │  • Tech Stack Match (30%)                                │     │
│  │  • Remote Flexibility (20%)                              │     │
│  │  • Experience Level (10%)                                │     │
│  │  • Company Quality (10%)                                 │     │
│  │                                                           │     │
│  │  Output: Final Score (0-100) + Reasoning                │     │
│  └──────────────────────────────────────────────────────────┘     │
│                              ↓                                     │
│  ┌──────────────────────────────────────────────────────────┐     │
│  │  Step 4: NOTIFY HIGH MATCHES                             │     │
│  │  ┌────────────────────────────────────┐                 │     │
│  │  │  Filter: score ≥ 75 AND            │                 │     │
│  │  │         is_emailed = false         │                 │     │
│  │  │           ↓                        │                 │     │
│  │  │  Generate email digest             │                 │     │
│  │  │  Send via Resend/SMTP              │                 │     │
│  │  │  Mark jobs as emailed              │                 │     │
│  │  └────────────────────────────────────┘                 │     │
│  └──────────────────────────────────────────────────────────┘     │
│                              ↓                                     │
│  ┌──────────────────────────────────────────────────────────┐     │
│  │  Step 5: LOG RUN RESULTS                                 │     │
│  │  ┌────────────────────────────────────┐                 │     │
│  │  │  Create agent_run record:          │                 │     │
│  │  │  • jobs_scraped                    │                 │     │
│  │  │  • jobs_inserted                   │                 │     │
│  │  │  • jobs_scored                     │                 │     │
│  │  │  • high_matches                    │                 │     │
│  │  │  • emails_sent                     │                 │     │
│  │  │  • status (success/error)          │                 │     │
│  │  │  • error_message (if any)          │                 │     │
│  │  └────────────────────────────────────┘                 │     │
│  └──────────────────────────────────────────────────────────┘     │
└─────────────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────────────┐
│                      DATA STORAGE (KV Store)                        │
│                                                                     │
│  Jobs Collection (Prefix: 'job_')                                  │
│  ┌────────────────────────────────────────────────────────┐       │
│  │ Key: job_{external_id}                                  │       │
│  │ Value: {                                                │       │
│  │   source, title, company, location,                     │       │
│  │   salary_min_usd, salary_max_usd, salary_original,      │       │
│  │   tech_stack[], remote_type, experience_level,          │       │
│  │   job_url, description,                                 │       │
│  │   score, score_reason, is_emailed, created_at           │       │
│  │ }                                                        │       │
│  └────────────────────────────────────────────────────────┘       │
│                                                                     │
│  Agent Runs Collection (Prefix: 'agent_run_')                      │
│  ┌────────────────────────────────────────────────────────┐       │
│  │ Key: agent_run_{timestamp}_{random}                     │       │
│  │ Value: {                                                │       │
│  │   run_date, jobs_scraped, jobs_inserted,                │       │
│  │   jobs_scored, high_matches, emails_sent,               │       │
│  │   status, error_message                                 │       │
│  │ }                                                        │       │
│  └────────────────────────────────────────────────────────┘       │
└─────────────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────────────┐
│                     AUTOMATION (Cron Job)                           │
│                                                                     │
│  Schedule: 0 7 * * * (Daily at 7 AM UTC)                           │
│                                                                     │
│  Trigger → POST /agent/run                                         │
│                                                                     │
│  Options:                                                           │
│  • Supabase pg_cron (built-in)                                     │
│  • GitHub Actions (external)                                        │
│  • Vercel Cron (external)                                           │
└─────────────────────────────────────────────────────────────────────┘
```

## Data Flow

### 1. Job Discovery Flow

```
Job Boards → Scraper → Normalization → Deduplication → KV Store
     ↓
  Raw HTML/JSON
     ↓
  Parse fields
     ↓
  Standardize:
  • Salary → USD
  • Location → Standard format
  • Tech stack → Array
  • Remote type → Enum
     ↓
  Check external_id
     ↓
  Insert if new
```

### 2. Scoring Flow

```
Unscored Jobs → OpenAI API → Function Call → Structured Response → Update Job
     ↓              ↓              ↓                ↓                  ↓
 score=null    System Prompt   score_job()      JSON Object      Set score
                   +                              {                    +
            Candidate Profile                  salary_score,      score_reason
                   +                           stack_score,
              Job Details                      ...
                                               final_score,
                                               reasoning
                                              }
```

### 3. Notification Flow

```
High Match Jobs → Email Template → Send Email → Mark as Emailed
     ↓                  ↓               ↓              ↓
 score ≥ 75        HTML Digest    Resend/SMTP   is_emailed=true
     AND                            API
 not emailed
```

## API Endpoints

### Authentication
All endpoints require admin password authentication.

### Available Endpoints

| Endpoint | Method | Purpose | Request Body |
|----------|--------|---------|--------------|
| `/agent/verify` | POST | Verify admin password | `{password}` |
| `/agent/jobs` | POST | Get all jobs (sorted by score) | `{password}` |
| `/agent/runs` | POST | Get recent agent runs (last 10) | `{password}` |
| `/agent/stats` | POST | Get dashboard statistics | `{password}` |
| `/agent/run` | POST | Execute agent (manual trigger) | `{password}` |

### Response Formats

**Jobs Response:**
```json
{
  "success": true,
  "jobs": [
    {
      "id": "job_remoteok_12345",
      "source": "remoteok",
      "title": "Senior React Developer",
      "company": "TechCorp",
      "score": 87,
      "score_reason": "Excellent salary match...",
      "is_emailed": false,
      ...
    }
  ]
}
```

**Stats Response:**
```json
{
  "success": true,
  "stats": {
    "total_jobs": 45,
    "high_matches": 12,
    "pending_review": 5,
    "last_run": "2026-02-14T07:00:00Z"
  }
}
```

**Run Response:**
```json
{
  "success": true,
  "run": {
    "id": "agent_run_...",
    "jobs_scraped": 15,
    "jobs_inserted": 8,
    "jobs_scored": 8,
    "high_matches": 3,
    "emails_sent": 3,
    "status": "success"
  }
}
```

## Error Handling Strategy

### Level 1: Graceful Degradation
```
If scraping fails → Continue with existing jobs
If OpenAI fails → Log error, continue to next job
If email fails → Log error, retry next run
```

### Level 2: Partial Success
```
Agent run completes with:
- status: "partial_success"
- error_message: "3 jobs failed to score"
```

### Level 3: Complete Failure
```
Agent run fails with:
- status: "error"
- error_message: "Database unreachable"
```

### Retry Logic
```
Scraping: 3 retries with exponential backoff
Scoring: 2 retries with 3s delay
Email: 2 retries with 10s delay
```

## Security Model

### Authentication
- Admin password stored in Supabase environment variables
- Password verified on every API call
- Session storage for frontend persistence

### Data Privacy
- No PII collected (job data only)
- Email addresses only stored for candidates
- Supabase RLS not used (KV store is private by default)

### API Keys
- OpenAI key stored in Supabase Secrets
- Resend/SMTP credentials in environment variables
- Never exposed to frontend

## Performance Characteristics

### Current Implementation (Mock Data)
- Scraping: ~1 second (simulated)
- Scoring: Instant (heuristic)
- Total runtime: ~2-3 seconds

### Production (Real APIs)
- Scraping: 30-60 seconds (3-5 sources)
- Scoring: 2-3 seconds per job (OpenAI)
- Email: 1-2 seconds
- Total runtime: 2-5 minutes for 100 jobs

### Scalability
- KV Store: Handles 10,000+ jobs easily
- Edge Functions: Unlimited concurrent requests
- OpenAI: Rate limit aware (60 RPM paid tier)

## Cost Breakdown (100 Jobs/Day)

| Service | Usage | Cost |
|---------|-------|------|
| Job Board APIs | Free tier | $0 |
| Supabase Edge Functions | ~300k req/month | $0 (under free tier) |
| Supabase KV Store | ~3,000 operations/day | $0 (under free tier) |
| OpenAI API | 100 jobs/day × $0.01 | ~$30/month |
| Resend Email | ~30 emails/month | $0 (under free tier) |
| **Total** | | **~$30/month** |

## Monitoring & Observability

### Metrics Tracked
- Jobs scraped per run
- Jobs inserted (new)
- Jobs scored per run
- High matches found
- Emails sent
- Error count and types
- Run duration

### Logs Available
- Supabase Edge Function logs (real-time)
- Agent run history (stored in KV)
- Error messages (stored with runs)

### Dashboards
- Frontend: `/agent` (real-time stats)
- Supabase: Edge Function logs
- Email: Daily digest (if matches found)

## Future Enhancements

### Phase 1 (MVP - Current)
- ✅ Frontend dashboard
- ✅ Mock job scraping
- ✅ Heuristic scoring
- ✅ Manual execution

### Phase 2 (Production)
- 🔄 Real job board scraping
- 🔄 OpenAI integration
- 🔄 Email notifications
- 🔄 Automated cron jobs

### Phase 3 (Advanced)
- ⏳ Multi-source aggregation (10+ job boards)
- ⏳ ML-based scoring (custom model)
- ⏳ Webhook notifications (Slack, Discord)
- ⏳ Browser extension for one-click apply

### Phase 4 (Enterprise)
- ⏳ Multi-user support
- ⏳ Custom scoring profiles
- ⏳ Application tracking
- ⏳ Analytics dashboard
