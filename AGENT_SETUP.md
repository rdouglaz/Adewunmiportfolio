# Get Your AI Agent Live - Simple 3-Step Guide

## What You Have
✅ Agent dashboard at `/agent` (link in footer)  
✅ Backend deployed and running  
✅ All code ready for real APIs

---

## Step 1: Set Agent Password (2 minutes)

1. Open: https://supabase.com/dashboard
2. Click your project
3. Go to: **Edge Functions** → **Secrets**
4. Click **"New secret"**
   - Name: `AGENT_PASSWORD`
   - Value: `YourSecurePassword123` (choose your own)
5. Click **Save**

Done! Now you can login at `/agent` with this password.

---

## Step 2: Test It Works (30 seconds)

1. Go to your website footer
2. Click **"AI Agent Dashboard"**
3. Login with your password from Step 1
4. Click **"Run Agent Now"**
5. Watch it scrape and score 2 demo jobs

You're now running on mock data. Keep reading to go live.

---

## Step 3: Go Live (Optional - Add Real APIs)

### Option A: Add OpenAI Scoring (Most Important)

**What it does:** Uses AI to intelligently score jobs instead of basic rules

1. Get OpenAI API key: https://platform.openai.com/api-keys
2. In Supabase Secrets, add:
   - Name: `OPENAI_API_KEY`
   - Value: Your API key (starts with `sk-`)
3. Update line 558 in `/supabase/functions/server/index.tsx`:
   - Replace `scoreJob` function with OpenAI API call
   - Example prompt: "Score this job from 0-100 based on: React skills, $2k-3.5k salary, remote work, mid-level experience"

### Option B: Add Real Job Scraping

**What it does:** Scrapes live job boards instead of mock data

Pick one:
- **RemoteOK:** Free API at remoteok.com/api (no key needed)
- **Adzuna:** Free tier at developer.adzuna.com  
- **JSearch:** On RapidAPI (2000 free requests/month)

Update line 515 in `/supabase/functions/server/index.tsx`:
- Replace `scrapeJobs` function
- Fetch real jobs from chosen API
- Transform to match the job format

### Option C: Add Email Notifications

**What it does:** Sends you emails when high-scoring jobs are found

1. Sign up: https://resend.com (free tier: 3000 emails/month)
2. Get API key from dashboard
3. In Supabase Secrets, add:
   - Name: `RESEND_API_KEY`
   - Value: Your Resend API key
4. Update line 456 in `/supabase/functions/server/index.tsx`:
   - Replace mock email with real Resend API call
   - Send HTML email with job details

---

## Current vs. Live Behavior

| Feature | Mock (Current) | Live (After APIs) |
|---------|---------------|-------------------|
| Jobs scraped | 2 demo jobs | 50-100+ real jobs |
| Scoring | Basic rules | AI-powered matching |
| Emails | Marked as sent | Real emails to inbox |
| Frequency | Manual only | Can automate daily |

---

## Quick Answers

**Q: Can I use it now without APIs?**  
Yes! It works perfectly for demos and testing.

**Q: Which API should I add first?**  
OpenAI for scoring - biggest impact on job matching quality.

**Q: How much do APIs cost?**  
- OpenAI: ~$0.002 per job scored (~$1 for 500 jobs)
- Resend: Free up to 3000 emails/month
- RemoteOK: Completely free

**Q: Password not working?**  
Make sure `AGENT_PASSWORD` is saved in Supabase → Edge Functions → Secrets.

**Q: Want to change scoring preferences?**  
Edit lines 573, 564-569 in `/supabase/functions/server/index.tsx` to adjust salary ranges and tech stack preferences.

---

## That's It!

Your agent is live and password-protected. Login at `/agent` in your footer to start using it.
