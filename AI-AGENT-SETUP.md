# AI Autonomous Intelligence Agent - Setup Guide

## Overview

Your AI Job Agent is a fully autonomous system that discovers, scores, and notifies you about relevant job opportunities. It runs on Supabase Edge Functions and operates 24/7 without manual intervention.

## System Architecture

```
Frontend (adewunmi.podsystem.ng/agent)
    ↓
Supabase Edge Functions
    ├── scrapeJobs()      → Discovers new jobs
    ├── scoreJobs()       → AI scoring via OpenAI
    ├── notifyMatches()   → Email digests
    └── runAgent()        → Orchestrates everything
    ↓
Supabase Database (KV Store)
    ├── Jobs
    └── Agent Runs
```

## Current Implementation

✅ **Frontend Dashboard** - `/agent` route with authentication
✅ **Edge Function Endpoints** - All API routes implemented
✅ **Mock Job Scraping** - Demo data for testing
✅ **Heuristic Scoring** - Simple scoring algorithm
✅ **Run Tracking** - Agent execution logs

## Production Upgrade Path

### 1. Real Job Scraping

The current `scrapeJobs()` function returns mock data. To scrape real jobs:

**Option A: Use Job Board APIs**
```typescript
// Install in Edge Function
import { RemoteOK } from 'npm:remoteok-api';

async function scrapeJobs() {
  const jobs = [];
  
  // RemoteOK
  const remoteOKJobs = await fetch('https://remoteok.com/api');
  const data = await remoteOKJobs.json();
  
  for (const job of data.slice(1)) { // Skip first element (metadata)
    jobs.push({
      external_id: `remoteok_${job.id}`,
      source: 'remoteok',
      title: job.position,
      company: job.company,
      location: job.location || 'Remote',
      salary_min_usd: job.salary_min || 0,
      salary_max_usd: job.salary_max || 0,
      salary_original: job.salary || '',
      tech_stack: job.tags || [],
      remote_type: 'fully_remote',
      experience_level: 'mid',
      job_url: job.url,
      description: job.description
    });
  }
  
  return jobs;
}
```

**Option B: Web Scraping**
```typescript
// Use Cheerio for scraping
import * as cheerio from 'npm:cheerio';

async function scrapeWeWorkRemotely() {
  const response = await fetch('https://weworkremotely.com/remote-jobs/search?term=react');
  const html = await response.text();
  const $ = cheerio.load(html);
  
  const jobs = [];
  $('.feature').each((i, elem) => {
    jobs.push({
      external_id: `wwr_${$(elem).attr('data-id')}`,
      source: 'weworkremotely',
      title: $(elem).find('.title').text(),
      company: $(elem).find('.company').text(),
      // ... parse other fields
    });
  });
  
  return jobs;
}
```

### 2. OpenAI Integration

Replace `scoreJob()` with real OpenAI API calls:

**Step 1: Add OpenAI API Key to Supabase Secrets**
```bash
# In Supabase Dashboard → Project Settings → Edge Functions → Secrets
OPENAI_API_KEY=sk-your-key-here
```

**Step 2: Update scoreJob() function**
```typescript
async function scoreJob(job: any) {
  const openaiKey = Deno.env.get('OPENAI_API_KEY');
  
  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${openaiKey}`
    },
    body: JSON.stringify({
      model: 'gpt-4o-mini',
      messages: [
        {
          role: 'system',
          content: `You are a job matching assistant. Score jobs for Adewunmi:
          
Profile:
- Target Salary: $2,000-$3,000/month
- Tech Stack: React, Next.js, TypeScript, Tailwind CSS
- Experience: 2-4 years (mid-level)
- Remote: Fully remote preferred
- Location: Open to worldwide remote roles

Score each dimension 0-100, then calculate final score.`
        },
        {
          role: 'user',
          content: `Score this job:\n\nTitle: ${job.title}\nCompany: ${job.company}\nSalary: ${job.salary_original}\nTech Stack: ${job.tech_stack.join(', ')}\nRemote: ${job.remote_type}\nExperience: ${job.experience_level}\n\nDescription: ${job.description.substring(0, 500)}...`
        }
      ],
      functions: [
        {
          name: 'score_job',
          description: 'Score a job against candidate profile',
          parameters: {
            type: 'object',
            properties: {
              salary_score: { type: 'number', description: 'Score for salary match (0-100)' },
              stack_score: { type: 'number', description: 'Score for tech stack match (0-100)' },
              remote_score: { type: 'number', description: 'Score for remote work (0-100)' },
              experience_score: { type: 'number', description: 'Score for experience level (0-100)' },
              company_score: { type: 'number', description: 'Score for company quality (0-100)' },
              final_score: { type: 'number', description: 'Overall match score (0-100)' },
              reasoning: { type: 'string', description: 'Explain why this job matches or doesn't' }
            },
            required: ['salary_score', 'stack_score', 'remote_score', 'experience_score', 'company_score', 'final_score', 'reasoning']
          }
        }
      ],
      function_call: { name: 'score_job' }
    })
  });

  const result = await response.json();
  const functionCall = result.choices[0].message.function_call;
  const scoring = JSON.parse(functionCall.arguments);
  
  return scoring;
}
```

### 3. Email Notifications

**Option A: Supabase SMTP**
```typescript
// Set environment variables in Supabase
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
ADMIN_EMAIL=adewunmi@example.com

// In notify function
import { SMTPClient } from "npm:denomailer";

async function notifyHighMatches(jobs: any[]) {
  const client = new SMTPClient({
    connection: {
      hostname: Deno.env.get('SMTP_HOST'),
      port: Number(Deno.env.get('SMTP_PORT')),
      tls: true,
      auth: {
        username: Deno.env.get('SMTP_USER'),
        password: Deno.env.get('SMTP_PASS'),
      }
    }
  });

  const emailBody = generateEmailHTML(jobs);
  
  await client.send({
    from: Deno.env.get('SMTP_USER'),
    to: Deno.env.get('ADMIN_EMAIL'),
    subject: `🎯 ${jobs.length} High-Match Jobs Found`,
    html: emailBody
  });
  
  await client.close();
}

function generateEmailHTML(jobs: any[]) {
  return `
    <h2>🌍 ${jobs.length} High-Match Roles Found (75%+)</h2>
    ${jobs.map(job => `
      <div style="border: 1px solid #e5e7eb; padding: 20px; margin: 20px 0; border-radius: 8px;">
        <h3>${job.title} - ${job.score}% Match</h3>
        <p><strong>Company:</strong> ${job.company}</p>
        <p><strong>Location:</strong> ${job.location}</p>
        <p><strong>Salary:</strong> ${job.salary_original}</p>
        <p><strong>Tech Stack:</strong> ${job.tech_stack.join(', ')}</p>
        <p><em>Why it matched:</em> ${job.score_reason}</p>
        <a href="${job.job_url}" style="color: #2563eb;">View Job →</a>
      </div>
    `).join('')}
  `;
}
```

**Option B: Resend (Recommended)**
```bash
# Add to Supabase Secrets
RESEND_API_KEY=re_your-key-here
```

```typescript
async function notifyHighMatches(jobs: any[]) {
  const resendKey = Deno.env.get('RESEND_API_KEY');
  
  await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${resendKey}`
    },
    body: JSON.stringify({
      from: 'AI Agent <agent@yourdomain.com>',
      to: ['adewunmi@example.com'],
      subject: `🎯 ${jobs.length} High-Match Jobs Found`,
      html: generateEmailHTML(jobs)
    })
  });
}
```

### 4. Cron Job Setup

**In Supabase Dashboard:**

1. Go to **Database** → **Cron Jobs** (or use pg_cron extension)
2. Create new cron job:

```sql
-- Enable pg_cron extension
CREATE EXTENSION IF NOT EXISTS pg_cron;

-- Schedule daily run at 7 AM UTC
SELECT cron.schedule(
  'daily-job-agent-run',
  '0 7 * * *',
  $$
  SELECT
    net.http_post(
      url := 'https://chwjguxldansjzauqqwz.supabase.co/functions/v1/make-server-1bf47000/agent/run',
      headers := '{"Content-Type": "application/json", "Authorization": "Bearer ' || current_setting('app.settings.anon_key') || '"}'::jsonb,
      body := '{"password": "' || current_setting('app.settings.admin_password') || '"}'::jsonb
    ) AS request_id;
  $$
);
```

**Alternative: GitHub Actions (if you prefer external scheduling)**

Create `.github/workflows/run-agent.yml`:
```yaml
name: Run Job Agent

on:
  schedule:
    - cron: '0 7 * * *'  # 7 AM UTC daily
  workflow_dispatch:  # Manual trigger

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

## Access & Usage

### Frontend Dashboard

1. Navigate to: `https://adewunmi.podsystem.ng/agent`
2. Login with admin password (same as admin dashboard)
3. View:
   - Total jobs tracked
   - High matches (75%+)
   - Pending reviews
   - Last agent run
4. Click **"Run Agent"** to manually trigger execution

### Features

- **Job Filtering**: Filter by minimum match score (50%, 75%, 85%+)
- **Job Details**: View full job descriptions, tech stack, and match reasoning
- **Run History**: See past agent executions with detailed metrics
- **Real-time Stats**: Dashboard updates after each run

## Environment Variables

Set these in **Supabase Dashboard → Project Settings → Edge Functions → Secrets**:

```bash
# Required
ADMIN_PASSWORD=your-secure-password

# For Production
OPENAI_API_KEY=sk-your-openai-key
RESEND_API_KEY=re-your-resend-key  # or SMTP credentials
ADMIN_EMAIL=your-email@example.com
```

## Monitoring & Debugging

### View Logs
```bash
# In Supabase Dashboard → Edge Functions → Logs
# Or via CLI:
supabase functions logs make-server-1bf47000
```

### Test Endpoints Manually
```bash
# Test scraping
curl -X POST https://chwjguxldansjzauqqwz.supabase.co/functions/v1/make-server-1bf47000/agent/run \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_ANON_KEY" \
  -d '{"password": "YOUR_PASSWORD"}'
```

## Failure Protection

The agent is designed to handle failures gracefully:

- If **scraping fails**: Continues to score existing jobs
- If **scoring fails**: Logs error, continues to next job
- If **email fails**: Logs error, marks run as partial success
- All errors are logged in `agent_runs` table

## Cost Estimates

- **OpenAI**: ~$0.01 per job scored (using gpt-4o-mini)
- **Resend**: Free tier includes 3,000 emails/month
- **Supabase**: Edge Functions are free up to 500k requests/month

**Monthly estimate for 100 jobs/day:**
- Scraping: Free
- Scoring: ~$30/month
- Emails: Free (under 100/day)
- **Total: ~$30/month**

## Next Steps

1. ✅ Test the dashboard at `/agent`
2. ✅ Run the agent manually to see mock data
3. 🔄 Add OpenAI API key for real scoring
4. 🔄 Implement real job board scraping
5. 🔄 Set up email notifications
6. 🔄 Configure cron job for daily automation

## Support

The system is fully operational with mock data. Ready for production upgrades when you add:
- Real job board APIs/scraping
- OpenAI integration
- Email service credentials
