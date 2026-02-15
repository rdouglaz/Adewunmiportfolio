# 🤖 AI Autonomous Intelligence Agent

## What is This?

An **AI-powered job discovery system** that runs 24/7 to find, score, and notify you about relevant job opportunities matching your profile.

## ⚡ Quick Links

- **Dashboard**: [https://adewunmi.podsystem.ng/agent](https://adewunmi.podsystem.ng/agent)
- **Setup Guide**: [AI-AGENT-SETUP.md](/AI-AGENT-SETUP.md)
- **Quick Start**: [AGENT-QUICKSTART.md](/AGENT-QUICKSTART.md)
- **Architecture**: [AGENT-ARCHITECTURE.md](/AGENT-ARCHITECTURE.md)
- **Configuration**: [AGENT-CONFIG.md](/AGENT-CONFIG.md)

---

## 🎯 What It Does

### Automated Job Discovery
- Scrapes multiple job boards daily (RemoteOK, We Work Remotely, Remotive, etc.)
- Filters for remote React/Next.js roles
- Salary range: $2k-$3.5k/month
- Experience: 2-4 years (mid-level)

### AI-Powered Scoring
- Uses OpenAI GPT-4o-mini to analyze jobs
- Scores 0-100% based on:
  - Salary match (30%)
  - Tech stack alignment (30%)
  - Remote flexibility (20%)
  - Experience level (10%)
  - Company quality (10%)

### Smart Notifications
- Email digest for high matches (75%+)
- Detailed reasoning for each match
- One-click apply links
- Daily at 7 AM UTC

---

## ✅ Current Status

### Fully Working (Right Now)
✅ Beautiful dashboard UI  
✅ Admin authentication  
✅ Mock job data generation  
✅ Heuristic scoring algorithm  
✅ Manual execution  
✅ Run history tracking  
✅ Job filtering by score  

### Ready for Production (Add API Keys)
🔄 OpenAI integration (code ready)  
🔄 Real job board scraping (code ready)  
🔄 Email notifications (code ready)  
🔄 Automated daily runs (code ready)  

---

## 🚀 Get Started in 3 Steps

### Step 1: Test It Now (0 min)
```
1. Visit: https://adewunmi.podsystem.ng/agent
2. Login with admin password
3. Click "Run Agent"
4. See demo jobs with scores!
```

### Step 2: Add OpenAI (5 min)
```bash
# In Supabase Dashboard → Edge Functions → Secrets
OPENAI_API_KEY=sk-your-key-here
```

### Step 3: Enable Automation (10 min)
```bash
# Add email service (Resend recommended)
RESEND_API_KEY=re-your-key
ADMIN_EMAIL=you@example.com

# Setup cron job (see QUICKSTART guide)
# → Daily runs at 7 AM UTC
```

**Total: 15 minutes to full production!**

---

## 📊 Dashboard Features

### Stats Overview
- **Total Jobs**: All jobs tracked
- **High Matches**: 75%+ score jobs
- **Pending Review**: Unread high matches
- **Last Run**: Most recent agent execution

### Jobs List
- Filter by minimum score (50%, 75%, 85%+)
- View match reasoning for each job
- See tech stack, salary, location
- One-click external job links
- Email status tracking

### Run History
- Last 10 agent executions
- Success/error status
- Jobs scraped/inserted/scored
- High matches found
- Emails sent

---

## 🛠 Tech Stack

- **Frontend**: React + TypeScript + Tailwind CSS
- **Backend**: Supabase Edge Functions (Hono)
- **Database**: Supabase KV Store
- **AI**: OpenAI GPT-4o-mini
- **Email**: Resend or SMTP
- **Automation**: Supabase Cron or GitHub Actions

---

## 💰 Cost Estimate

| Usage | Monthly Cost |
|-------|--------------|
| 10 jobs/day | $3 |
| 50 jobs/day | $15 |
| 100 jobs/day | $30 |

*Includes OpenAI API only. Email and hosting are free.*

---

## 📁 File Structure

```
/src/app/pages/Agent.tsx              Frontend dashboard
/supabase/functions/server/index.tsx  Backend API + agent logic
/AI-AGENT-SETUP.md                    Detailed setup guide
/AGENT-QUICKSTART.md                  Quick start guide
/AGENT-ARCHITECTURE.md                System architecture
/AGENT-CONFIG.md                      Configuration reference
/AGENT-README.md                      This file
```

---

## 🔐 Security

- Admin password authentication required
- API keys stored in Supabase Secrets (never exposed)
- Session-based frontend auth
- No PII collection
- Supabase Edge Functions (isolated execution)

---

## 🎨 UI Preview

```
┌─────────────────────────────────────────────┐
│  🧠 AI Job Agent                      [Run] │
│  Autonomous job discovery & matching        │
├─────────────────────────────────────────────┤
│  📊 Stats                                    │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐    │
│  │ 45 Jobs  │ │12 Matches│ │  5 New   │    │
│  └──────────┘ └──────────┘ └──────────┘    │
├─────────────────────────────────────────────┤
│  💼 Matched Jobs          Filter: [75%+▾]  │
│  ┌─────────────────────────────────────┐   │
│  │ Senior React Developer      87% ✓   │   │
│  │ TechCorp • Remote • $2.5k-$3.5k     │   │
│  │ React, Next.js, TypeScript          │   │
│  │ Match: Excellent salary range...    │   │
│  └─────────────────────────────────────┘   │
│  ┌─────────────────────────────────────┐   │
│  │ Full Stack Engineer         81% ✓   │   │
│  │ StartupXYZ • Remote • $2k-$3k       │   │
│  │ React, Node.js, PostgreSQL          │   │
│  │ Match: Good tech stack match...     │   │
│  └─────────────────────────────────────┘   │
├─────────────────────────────────────────────┤
│  📈 Recent Agent Runs                       │
│  ✅ 2026-02-14 07:00 | 15→8→3 high matches │
│  ✅ 2026-02-13 07:00 | 12→5→2 high matches │
└─────────────────────────────────────────────┘
```

---

## 🔧 Customization

### Change Scoring Weights
Edit `/supabase/functions/server/index.tsx`:
```typescript
const finalScore = Math.round(
  (salaryScore * 0.30) +    // Adjust these
  (stackScore * 0.30) +
  (remoteScore * 0.20) +
  (experienceScore * 0.10) +
  (companyScore * 0.10)
);
```

### Add Job Boards
Add new scraper functions:
```typescript
async function scrapeNewBoard() {
  // Your scraping logic
  return jobs;
}

// Call in scrapeJobs()
const allJobs = [
  ...await scrapeRemoteOK(),
  ...await scrapeNewBoard()
];
```

### Change Schedule
Modify cron expression:
```sql
'0 7 * * *'   -- 7 AM daily
'0 */6 * * *' -- Every 6 hours
'0 9 * * 1'   -- Mondays at 9 AM
```

---

## 🐛 Troubleshooting

### Problem: No jobs showing
**Solution**: Click "Run Agent" to generate demo data

### Problem: OpenAI not working
**Solution**: Verify API key in Supabase Secrets

### Problem: Email not sending
**Solution**: Check RESEND_API_KEY and ADMIN_EMAIL are set

### Problem: Cron not running
**Solution**: Verify cron job is scheduled in Supabase

For more: See [AGENT-QUICKSTART.md](/AGENT-QUICKSTART.md) → Troubleshooting

---

## 📈 Roadmap

### Phase 1: MVP (Completed ✅)
- Frontend dashboard
- Mock data system
- Manual execution
- Basic authentication

### Phase 2: Production (Ready 🔄)
- OpenAI scoring
- Real job scraping
- Email notifications
- Automated runs

### Phase 3: Advanced (Planned ⏳)
- 10+ job board integrations
- Custom scoring profiles
- Slack/Discord webhooks
- Application tracking

### Phase 4: Enterprise (Future 🔮)
- Multi-user support
- Team collaboration
- Analytics dashboard
- API access

---

## 🤝 How It Works

```
Every day at 7 AM UTC:

1. 🔍 Scrape job boards
   → Fetch new React/Next.js remote jobs
   → Filter by salary ($2k-$3.5k)
   
2. 💾 Store new jobs
   → Check for duplicates (external_id)
   → Insert only new listings
   
3. 🧠 Score with AI
   → Send to OpenAI GPT-4o-mini
   → Get structured 0-100% score
   → Store with detailed reasoning
   
4. 📧 Notify high matches
   → Filter jobs with 75%+ score
   → Generate HTML email digest
   → Send via Resend/SMTP
   
5. 📊 Log results
   → Save run statistics
   → Display in dashboard
```

---

## 💡 Pro Tips

1. **Start with mock data** - Test UI and flow before adding APIs
2. **Monitor OpenAI costs** - Start with 10-20 jobs/day
3. **Set email threshold** - Only 85%+ to reduce noise
4. **Review weekly** - Adjust scoring weights based on results
5. **Use Resend** - Better deliverability than SMTP

---

## 📞 Support

- **Documentation**: See `/AGENT-*.md` files
- **Code**: Check `/src/app/pages/Agent.tsx` and `/supabase/functions/server/index.tsx`
- **Logs**: Supabase Dashboard → Edge Functions → Logs

---

## 🎉 You're All Set!

Your AI Agent is ready to:
- ✅ Work 24/7 finding opportunities
- ✅ Score jobs against your profile
- ✅ Notify you of high matches
- ✅ Track everything in one dashboard

**Next**: Visit [/agent](https://adewunmi.podsystem.ng/agent) and click "Run Agent"!

---

*Built with ❤️ for Adewunmi - Full-Stack AI Builder*
