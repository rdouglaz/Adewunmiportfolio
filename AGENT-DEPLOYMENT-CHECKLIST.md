# 🚀 AI Agent Deployment Checklist

## Pre-Deployment Verification

### ✅ Code Implementation Status

- [x] Frontend Dashboard (`/src/app/pages/Agent.tsx`)
  - [x] Authentication screen
  - [x] Stats cards
  - [x] Jobs list with filtering
  - [x] Run history
  - [x] Manual run button
  - [x] Error handling
  - [x] Loading states

- [x] Backend API (`/supabase/functions/server/index.tsx`)
  - [x] `/agent/verify` - Authentication
  - [x] `/agent/jobs` - Get jobs
  - [x] `/agent/runs` - Get run history
  - [x] `/agent/stats` - Get statistics
  - [x] `/agent/run` - Execute agent
  - [x] `scrapeJobs()` - Job scraping (mock + production ready)
  - [x] `scoreJob()` - Scoring (heuristic + OpenAI ready)

- [x] Routing
  - [x] `/agent` route added to App.tsx
  - [x] Route imports correct
  - [x] Navigation updated (if needed)

- [x] Documentation
  - [x] AI-AGENT-SETUP.md
  - [x] AGENT-QUICKSTART.md
  - [x] AGENT-ARCHITECTURE.md
  - [x] AGENT-CONFIG.md
  - [x] AGENT-README.md
  - [x] AGENT-DEPLOYMENT-CHECKLIST.md

---

## Deployment Steps

### 1. Test Locally (Development)

```bash
# Start development server
npm run dev

# Visit in browser
http://localhost:5173/agent

# Verify:
✓ Login screen displays
✓ Can authenticate with admin password
✓ Dashboard loads
✓ "Run Agent" button works
✓ Demo jobs appear
✓ Stats update
✓ Run history shows
```

### 2. Deploy to Vercel/Production

```bash
# Build for production
npm run build

# Deploy
vercel --prod  # or your deployment command

# Verify deployment
✓ Visit https://adewunmi.podsystem.ng/agent
✓ Test authentication
✓ Test manual run
```

### 3. Configure Supabase Secrets

**Required (Minimum):**
```bash
# In Supabase Dashboard → Project Settings → Edge Functions → Secrets

ADMIN_PASSWORD=your-secure-password-here
```

**For Production (Recommended):**
```bash
# OpenAI Integration
OPENAI_API_KEY=sk-proj-xxxxxxxxxxxxxxxxxxxxxxxxxxxxx

# Email Notifications (choose one)
# Option A: Resend (Recommended)
RESEND_API_KEY=re-xxxxxxxxxxxxxxxxxxxxxxxxxxxxx
ADMIN_EMAIL=your-email@example.com

# Option B: SMTP
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
ADMIN_EMAIL=your-email@example.com
```

### 4. Test Production API

```bash
# Test authentication
curl -X POST https://chwjguxldansjzauqqwz.supabase.co/functions/v1/make-server-1bf47000/agent/verify \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNod2pndXhsZGFuc2p6YXVxcXd6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njk1MjU5NDMsImV4cCI6MjA4NTEwMTk0M30.n6mDoHWzIdruSF7Pf-PfrM52mO1EePnloLRR36M3vFE" \
  -d '{"password": "your-password"}'

# Expected: {"success": true}

# Test manual run
curl -X POST https://chwjguxldansjzauqqwz.supabase.co/functions/v1/make-server-1bf47000/agent/run \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNod2pndXhsZGFuc2p6YXVxcXd6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njk1MjU5NDMsImV4cCI6MjA4NTEwMTk0M30.n6mDoHWzIdruSF7Pf-PfrM52mO1EePnloLRR36M3vFE" \
  -d '{"password": "your-password"}'

# Expected: {"success": true, "run": {...}}
```

### 5. Setup Automation (Optional)

**Option A: Supabase Cron (Built-in)**

1. Go to Supabase Dashboard → SQL Editor
2. Run this SQL:

```sql
-- Enable cron extension
CREATE EXTENSION IF NOT EXISTS pg_cron;

-- Schedule daily run at 7 AM UTC (8 AM WAT Nigeria)
SELECT cron.schedule(
  'daily-job-agent-run',
  '0 7 * * *',
  $$
  SELECT net.http_post(
    url := 'https://chwjguxldansjzauqqwz.supabase.co/functions/v1/make-server-1bf47000/agent/run',
    headers := '{"Content-Type": "application/json", "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNod2pndXhsZGFuc2p6YXVxcXd6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njk1MjU5NDMsImV4cCI6MjA4NTEwMTk0M30.n6mDoHWzIdruSF7Pf-PfrM52mO1EePnloLRR36M3vFE"}'::jsonb,
    body := '{"password": "YOUR_ADMIN_PASSWORD_HERE"}'::jsonb
  ) AS request_id;
  $$
);

-- Verify cron job is scheduled
SELECT * FROM cron.job;
```

**Option B: GitHub Actions**

1. Create `.github/workflows/job-agent.yml`:

```yaml
name: Daily Job Agent

on:
  schedule:
    - cron: '0 7 * * *'  # 7 AM UTC daily
  workflow_dispatch:      # Allow manual trigger

jobs:
  run-agent:
    runs-on: ubuntu-latest
    steps:
      - name: Trigger AI Agent
        run: |
          curl -X POST \
            https://chwjguxldansjzauqqwz.supabase.co/functions/v1/make-server-1bf47000/agent/run \
            -H "Content-Type: application/json" \
            -H "Authorization: Bearer ${{ secrets.SUPABASE_ANON_KEY }}" \
            -d '{"password": "${{ secrets.ADMIN_PASSWORD }}"}'
```

2. Add GitHub Secrets:
   - `SUPABASE_ANON_KEY`
   - `ADMIN_PASSWORD`

3. Test with "Run workflow" button in GitHub Actions

---

## Post-Deployment Testing

### Manual Tests

1. **Authentication Test**
   - [ ] Visit `/agent`
   - [ ] Enter wrong password → See error
   - [ ] Enter correct password → Dashboard loads
   - [ ] Refresh page → Stay logged in
   - [ ] Logout → Return to login screen

2. **Dashboard Test**
   - [ ] Stats cards display (may show 0s on first visit)
   - [ ] Jobs list is empty or has demo data
   - [ ] Run history is empty or has demo data
   - [ ] All UI elements render correctly

3. **Manual Run Test**
   - [ ] Click "Run Agent" button
   - [ ] Button shows loading state
   - [ ] After ~2-3 seconds, jobs appear
   - [ ] Stats update
   - [ ] Run history shows new entry
   - [ ] Run status is "success"

4. **Filtering Test**
   - [ ] Change filter to "50%+"
   - [ ] Change filter to "75%+"
   - [ ] Change filter to "85%+"
   - [ ] Job count updates correctly

5. **Job Details Test**
   - [ ] Jobs show title, company, location
   - [ ] Tech stack badges display
   - [ ] Match score shows
   - [ ] Match reasoning displays
   - [ ] "View Job" link works

### Production Tests (After Adding API Keys)

6. **OpenAI Scoring Test**
   - [ ] Add `OPENAI_API_KEY` to Supabase Secrets
   - [ ] Run agent manually
   - [ ] Check Supabase Edge Function logs
   - [ ] Verify OpenAI API is called
   - [ ] Job scores are nuanced (not just 0, 50, 100)
   - [ ] Match reasoning is detailed

7. **Email Test**
   - [ ] Add email credentials to Supabase Secrets
   - [ ] Ensure at least 1 job has score ≥ 75
   - [ ] Run agent manually
   - [ ] Check email inbox
   - [ ] Verify email received
   - [ ] Email formatting is correct
   - [ ] Job links work

8. **Automated Run Test**
   - [ ] Wait for scheduled time (or trigger manually)
   - [ ] Check Supabase Edge Function logs
   - [ ] Verify cron triggered the run
   - [ ] Check dashboard for new run entry
   - [ ] Verify email sent (if high matches)

---

## Monitoring Setup

### Daily Checks (First Week)

- [ ] Check `/agent` dashboard daily
- [ ] Verify new runs appear
- [ ] Review job quality
- [ ] Monitor OpenAI costs
- [ ] Check email deliverability

### Weekly Checks

- [ ] Review all high matches (75%+)
- [ ] Adjust scoring weights if needed
- [ ] Monitor API quota usage
- [ ] Check for errors in run history

### Monthly Checks

- [ ] Review total costs (OpenAI + Email)
- [ ] Optimize job board sources
- [ ] Update candidate profile
- [ ] Archive old jobs

---

## Performance Benchmarks

### Expected Performance

| Metric | Mock Mode | Production |
|--------|-----------|------------|
| Run Duration | 2-3 seconds | 2-5 minutes |
| Jobs Scraped | 2 (demo) | 50-100 |
| Scoring Speed | Instant | 2-3s per job |
| Email Delivery | N/A | 1-2 seconds |

### Expected Costs

| Jobs/Day | OpenAI Cost/Month | Email Cost/Month | Total |
|----------|-------------------|------------------|-------|
| 10 | $3 | $0 | **$3** |
| 50 | $15 | $0 | **$15** |
| 100 | $30 | $0 | **$30** |

---

## Troubleshooting Guide

### Issue: Can't Login
- **Check**: ADMIN_PASSWORD is set in Supabase Secrets
- **Check**: Using correct password
- **Check**: Edge Function is deployed

### Issue: No Jobs After Manual Run
- **Check**: Edge Function logs for errors
- **Check**: `scrapeJobs()` is returning data
- **Check**: KV store is accessible

### Issue: OpenAI Not Working
- **Check**: OPENAI_API_KEY is correct
- **Check**: OpenAI account has credits
- **Check**: Edge Function logs show API errors
- **Check**: Rate limits not exceeded

### Issue: Email Not Sending
- **Check**: RESEND_API_KEY or SMTP credentials are correct
- **Check**: ADMIN_EMAIL is set
- **Check**: At least 1 job has score ≥ 75
- **Check**: Email service API logs

### Issue: Cron Not Running
- **Check**: Cron job is scheduled (SQL query)
- **Check**: Password in cron body is correct
- **Check**: Edge Function logs at scheduled time
- **Check**: pg_cron extension is enabled

---

## Success Criteria

### Minimum Viable (Mock Mode)
- ✅ Can access `/agent` dashboard
- ✅ Can login with admin password
- ✅ Can run agent manually
- ✅ Demo jobs appear
- ✅ Stats update correctly
- ✅ Run history tracks executions

### Production Ready
- 🔄 OpenAI API key configured
- 🔄 Real job boards scraped
- 🔄 AI scoring working
- 🔄 Email notifications sent
- 🔄 Automated daily runs

### Fully Operational
- 🎯 Daily runs completing successfully
- 🎯 High-quality job matches (75%+)
- 🎯 Email digests delivered daily
- 🎯 No errors in run history
- 🎯 Costs within budget

---

## Launch Announcement (Optional)

Once everything is working, you can announce on:

- LinkedIn: "Built an AI agent that finds remote jobs for me 24/7"
- Twitter: "Automated my job search with OpenAI + Supabase"
- Portfolio: Add to /projects page as a case study

---

## Support & Maintenance

### Where to Find Help
- Documentation: `/AGENT-*.md` files
- Code: `/src/app/pages/Agent.tsx` and `/supabase/functions/server/index.tsx`
- Logs: Supabase Dashboard → Edge Functions → Logs

### Regular Maintenance
- **Weekly**: Review high matches, adjust weights
- **Monthly**: Check costs, optimize sources
- **Quarterly**: Update candidate profile, refine criteria

---

## 🎉 Deployment Complete!

Once you've checked all boxes above, your AI Agent is:
- ✅ Live and accessible
- ✅ Fully functional
- ✅ Ready for production
- ✅ Monitored and maintained

**Next Steps:**
1. Test the dashboard at `/agent`
2. Run agent manually to verify
3. Add OpenAI key for AI scoring
4. Set up email for notifications
5. Enable cron for automation

**Your AI Agent is now working 24/7 to find your next opportunity! 🚀**
