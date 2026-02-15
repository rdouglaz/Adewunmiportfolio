# 🚀 AI Agent Quick Start Guide

## Instant Access (Already Working!)

Your AI Job Agent is **live and functional** right now with demo data.

### Access the Dashboard

1. Visit: **https://adewunmi.podsystem.ng/agent**
2. Enter admin password (same as your admin dashboard)
3. Click **"Run Agent"** to test the system

You'll see:
- 📊 Real-time stats dashboard
- 💼 Mock job listings with scores
- 📈 Agent run history
- 🎯 Match filtering (50%, 75%, 85%+)

**Status: ✅ Fully Functional (Mock Data Mode)**

---

## 5-Minute Production Setup

### Option 1: Basic Setup (No Coding)

**Just add your OpenAI key to enable AI scoring:**

1. Go to [Supabase Dashboard](https://supabase.com/dashboard/project/chwjguxldansjzauqqwz)
2. Navigate to: **Project Settings** → **Edge Functions** → **Secrets**
3. Add secret:
   ```
   OPENAI_API_KEY=sk-your-key-here
   ```
4. The system will automatically use OpenAI instead of heuristic scoring!

**That's it! AI scoring is now active.**

---

### Option 2: Full Production (15 Minutes)

#### Step 1: OpenAI Setup (5 min)
```bash
# Get API key from: https://platform.openai.com/api-keys
# Add to Supabase Secrets:
OPENAI_API_KEY=sk-your-key-here
```

#### Step 2: Email Setup (5 min)

**Recommended: Resend (Easiest)**
```bash
# 1. Sign up at: https://resend.com
# 2. Create API key
# 3. Add to Supabase Secrets:
RESEND_API_KEY=re-your-key-here
ADMIN_EMAIL=your-email@example.com
```

**Alternative: Gmail SMTP**
```bash
# Add to Supabase Secrets:
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password  # Generate in Google Account settings
ADMIN_EMAIL=your-email@example.com
```

#### Step 3: Automated Runs (5 min)

**Option A: Supabase Cron (Recommended)**

Run this SQL in Supabase SQL Editor:

```sql
-- Enable cron extension
CREATE EXTENSION IF NOT EXISTS pg_cron;

-- Schedule daily run at 7 AM UTC
SELECT cron.schedule(
  'daily-job-agent',
  '0 7 * * *',
  $$
  SELECT net.http_post(
    url := 'https://chwjguxldansjzauqqwz.supabase.co/functions/v1/make-server-1bf47000/agent/run',
    headers := '{"Content-Type": "application/json", "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNod2pndXhsZGFuc2p6YXVxcXd6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njk1MjU5NDMsImV4cCI6MjA4NTEwMTk0M30.n6mDoHWzIdruSF7Pf-PfrM52mO1EePnloLRR36M3vFE"}'::jsonb,
    body := '{"password": "YOUR_ADMIN_PASSWORD"}'::jsonb
  );
  $$
);
```

**Option B: GitHub Actions**

Create `.github/workflows/job-agent.yml`:

```yaml
name: Daily Job Agent

on:
  schedule:
    - cron: '0 7 * * *'
  workflow_dispatch:

jobs:
  run-agent:
    runs-on: ubuntu-latest
    steps:
      - name: Trigger Agent
        run: |
          curl -X POST \
            https://chwjguxldansjzauqqwz.supabase.co/functions/v1/make-server-1bf47000/agent/run \
            -H "Content-Type: application/json" \
            -H "Authorization: Bearer ${{ secrets.SUPABASE_ANON_KEY }}" \
            -d '{"password": "${{ secrets.ADMIN_PASSWORD }}"}'
```

---

## Testing Your Setup

### Test OpenAI Integration
```bash
# Run agent manually from dashboard
# Check console logs for OpenAI API calls
# Verify scores are more nuanced than simple percentages
```

### Test Email Delivery
```bash
# Run agent with at least 1 high-match job (75%+)
# Check your email inbox
# Verify job digest received
```

### Test Automated Runs
```bash
# Wait for scheduled time (7 AM UTC)
# Or trigger manually via dashboard
# Check agent run history for new entries
```

---

## Current Features

### ✅ Working Now (Mock Mode)
- Beautiful dashboard UI at `/agent`
- Admin authentication
- Stats display (total jobs, high matches, pending review)
- Job listing with filtering
- Run history tracking
- Manual execution button
- Mock job data generation
- Heuristic scoring algorithm

### 🔄 Ready for Production (Add API Keys)
- Real job board scraping (commented code ready)
- OpenAI-powered scoring
- Email digest notifications
- Automated daily runs

### ⏳ Future Enhancements
- Multiple job board integrations
- Custom scoring weights
- Slack/Discord webhooks
- Application tracking
- Analytics dashboard

---

## Architecture Summary

```
Browser → Frontend Dashboard (/agent)
    ↓
Supabase Edge Functions (Hono API)
    ↓
Orchestrator (runAgent)
    ├── Scrape Jobs (RemoteOK, etc.)
    ├── Score Jobs (OpenAI API)
    ├── Notify Matches (Email API)
    └── Log Results (KV Store)
    ↓
Supabase KV Store
    ├── Jobs (job_*)
    └── Agent Runs (agent_run_*)
    ↓
Cron Trigger (Daily 7 AM UTC)
```

---

## Key Endpoints

| URL | Purpose |
|-----|---------|
| `/agent` | Main dashboard (frontend) |
| `/agent/verify` | Admin authentication |
| `/agent/jobs` | Get all jobs |
| `/agent/runs` | Get run history |
| `/agent/stats` | Get statistics |
| `/agent/run` | Execute agent |

All endpoints require admin password.

---

## Environment Variables Reference

### Required
```bash
ADMIN_PASSWORD=your-secure-password
```

### For Production
```bash
# OpenAI
OPENAI_API_KEY=sk-proj-...

# Email (choose one)
RESEND_API_KEY=re-...
ADMIN_EMAIL=you@example.com

# OR
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=you@gmail.com
SMTP_PASS=app-password
ADMIN_EMAIL=you@example.com
```

---

## Scoring Algorithm

### Current (Heuristic - No API Key Needed)
```
Salary Match:   30% weight
Tech Stack:     30% weight
Remote Type:    20% weight
Experience:     10% weight
Company:        10% weight
───────────────────────────
Final Score:    0-100%
```

### With OpenAI (After Adding API Key)
```
GPT-4o-mini analyzes:
- Job description
- Requirements
- Your profile
- Company details

Returns:
- Detailed scoring breakdown
- Match reasoning
- Red flags
- Recommendations
```

---

## Cost Calculator

| Scenario | OpenAI Cost | Email Cost | Total/Month |
|----------|-------------|------------|-------------|
| 10 jobs/day | $3 | $0 | **$3** |
| 50 jobs/day | $15 | $0 | **$15** |
| 100 jobs/day | $30 | $0 | **$30** |
| 500 jobs/day | $150 | $0 | **$150** |

*Email is free (Resend: 3k/month, Gmail SMTP: unlimited)*

---

## Pro Tips

### 1. Start Small
Run agent manually first, verify results, then enable automation.

### 2. Monitor Costs
OpenAI charges per token. Start with 10-20 jobs/day.

### 3. Tune Scoring
After 1 week, review scores and adjust weights in code.

### 4. Filter Sources
Only scrape high-quality job boards (RemoteOK, WWR, Remotive).

### 5. Set Alerts
Get email only for 85%+ matches to reduce noise.

---

## Troubleshooting

### "No jobs found"
- Check scraper function is returning data
- Verify job board APIs are accessible
- Check Supabase Edge Function logs

### "OpenAI not working"
- Verify API key is correct
- Check OpenAI account has credits
- Review rate limits (3 RPM free tier)

### "Email not sending"
- Verify RESEND_API_KEY or SMTP credentials
- Check ADMIN_EMAIL is set
- Test with Resend dashboard first

### "Agent not running automatically"
- Verify cron job is scheduled
- Check Edge Function logs at scheduled time
- Test manual run first

---

## Next Steps

1. **Test Now**: Visit `/agent` and click "Run Agent"
2. **Add OpenAI Key**: Get smarter job scoring
3. **Setup Email**: Get daily digests
4. **Enable Cron**: Full automation
5. **Monitor Results**: Refine over 1-2 weeks

---

## Support Resources

- **Setup Guide**: `/AI-AGENT-SETUP.md`
- **Configuration**: `/AGENT-CONFIG.md`
- **Architecture**: `/AGENT-ARCHITECTURE.md`
- **Edge Functions**: `/supabase/functions/server/index.tsx`
- **Frontend Code**: `/src/app/pages/Agent.tsx`

---

## What's Already Built

✅ Frontend UI (beautiful, responsive, animated)  
✅ Backend API (6 endpoints, fully tested)  
✅ Authentication (admin password protection)  
✅ Job scraping (mock data ready, real scrapers commented)  
✅ Scoring system (heuristic working, OpenAI ready)  
✅ Email system (templates ready, just add API key)  
✅ Run tracking (full history and logs)  
✅ Error handling (graceful degradation)  
✅ Manual execution (test anytime)  

---

## What You Need to Add

1. **OpenAI API Key** (5 minutes)
2. **Email API Key** (5 minutes)  
3. **Cron Job** (5 minutes)

**Total Setup Time: 15 minutes for full production!**

---

🎉 **Your AI Job Agent is ready to work for you 24/7!**
