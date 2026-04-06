import { Hono } from "npm:hono";
import { cors } from "npm:hono/cors";
import { logger } from "npm:hono/logger";
import * as kv from "./kv_store.tsx";
const app = new Hono();

// Enable logger
app.use('*', logger(console.log));

// Enable CORS for all routes and methods
app.use(
  "/*",
  cors({
    origin: "*",
    allowHeaders: ["Content-Type", "Authorization"],
    allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    exposeHeaders: ["Content-Length"],
    maxAge: 600,
  }),
);

// Health check endpoint
app.get("/make-server-1bf47000/health", (c) => {
  return c.json({ status: "ok" });
});

// Submit demo request endpoint
app.post("/make-server-1bf47000/demo-request", async (c) => {
  try {
    const body = await c.req.json();
    const { name, email, company, message } = body;

    // Validate required fields
    if (!name || !email) {
      return c.json({ error: "Name and email are required" }, 400);
    }

    // Create a unique ID for this submission
    const submissionId = `demo_request_${Date.now()}_${Math.random().toString(36).substring(7)}`;
    
    // Store the submission in the KV store
    await kv.set(submissionId, {
      name,
      email,
      company: company || '',
      message: message || '',
      submittedAt: new Date().toISOString(),
      status: 'new'
    });

    console.log(`Demo request saved: ${submissionId} for ${email}`);

    return c.json({ 
      success: true, 
      message: "Demo request submitted successfully",
      submissionId 
    });
  } catch (error) {
    console.error("Error saving demo request:", error);
    return c.json({ 
      error: "Failed to save demo request",
      details: error instanceof Error ? error.message : String(error)
    }, 500);
  }
});

// Get all demo requests (admin endpoint)
app.post("/make-server-1bf47000/admin/leads", async (c) => {
  try {
    const body = await c.req.json();
    const { password } = body;

    // Simple password check
    const adminPassword = Deno.env.get('ADMIN_PASSWORD') || 'admin123';
    if (password !== adminPassword) {
      return c.json({ error: "Invalid password" }, 401);
    }

    // Get all demo requests from KV store
    const leads = await kv.getByPrefix('demo_request_');
    
    // Sort by submission date (newest first)
    const sortedLeads = leads.sort((a: any, b: any) => {
      const dateA = new Date(a.value.submittedAt).getTime();
      const dateB = new Date(b.value.submittedAt).getTime();
      return dateB - dateA;
    });

    return c.json({ 
      success: true, 
      leads: sortedLeads.map((lead: any) => ({
        id: lead.key,
        ...lead.value
      }))
    });
  } catch (error) {
    console.error("Error fetching leads:", error);
    return c.json({ 
      error: "Failed to fetch leads",
      details: error instanceof Error ? error.message : String(error)
    }, 500);
  }
});

// Update lead status (admin endpoint)
app.post("/make-server-1bf47000/admin/update-lead", async (c) => {
  try {
    const body = await c.req.json();
    const { password, leadId, status } = body;

    // Simple password check
    const adminPassword = Deno.env.get('ADMIN_PASSWORD') || 'admin123';
    if (password !== adminPassword) {
      return c.json({ error: "Invalid password" }, 401);
    }

    // Validate required fields
    if (!leadId || !status) {
      return c.json({ error: "Lead ID and status are required" }, 400);
    }

    // Get the current lead data
    const currentLead = await kv.get(leadId);
    if (!currentLead) {
      return c.json({ error: "Lead not found" }, 404);
    }

    // Update the lead with new status
    await kv.set(leadId, {
      ...currentLead,
      status,
      updatedAt: new Date().toISOString()
    });

    console.log(`Lead ${leadId} status updated to ${status}`);

    return c.json({ 
      success: true, 
      message: "Lead status updated successfully"
    });
  } catch (error) {
    console.error("Error updating lead:", error);
    return c.json({ 
      error: "Failed to update lead",
      details: error instanceof Error ? error.message : String(error)
    }, 500);
  }
});

// Submit feedback endpoint
app.post("/make-server-1bf47000/feedback", async (c) => {
  try {
    const body = await c.req.json();
    const { name, email, category, message } = body;

    // Validate required fields
    if (!name || !email || !message) {
      return c.json({ error: "Name, email, and message are required" }, 400);
    }

    // Create a unique ID for this feedback
    const feedbackId = `feedback_${Date.now()}_${Math.random().toString(36).substring(7)}`;
    
    // Store the feedback in the KV store
    await kv.set(feedbackId, {
      name,
      email,
      category: category || 'general',
      message,
      submittedAt: new Date().toISOString(),
      status: 'new'
    });

    console.log(`Feedback saved: ${feedbackId} from ${email}`);

    return c.json({ 
      success: true, 
      message: "Feedback submitted successfully",
      feedbackId 
    });
  } catch (error) {
    console.error("Error saving feedback:", error);
    return c.json({ 
      error: "Failed to save feedback",
      details: error instanceof Error ? error.message : String(error)
    }, 500);
  }
});

// Get all feedback (admin endpoint)
app.post("/make-server-1bf47000/admin/feedback", async (c) => {
  try {
    const body = await c.req.json();
    const { password } = body;

    // Simple password check
    const adminPassword = Deno.env.get('ADMIN_PASSWORD') || 'admin123';
    if (password !== adminPassword) {
      return c.json({ error: "Invalid password" }, 401);
    }

    // Get all feedback from KV store
    const feedback = await kv.getByPrefix('feedback_');
    
    // Sort by submission date (newest first)
    const sortedFeedback = feedback.sort((a: any, b: any) => {
      const dateA = new Date(a.value.submittedAt).getTime();
      const dateB = new Date(b.value.submittedAt).getTime();
      return dateB - dateA;
    });

    return c.json({ 
      success: true, 
      feedback: sortedFeedback.map((item: any) => ({
        id: item.key,
        ...item.value
      }))
    });
  } catch (error) {
    console.error("Error fetching feedback:", error);
    return c.json({ 
      error: "Failed to fetch feedback",
      details: error instanceof Error ? error.message : String(error)
    }, 500);
  }
});

// Update feedback status (admin endpoint)
app.post("/make-server-1bf47000/admin/update-feedback", async (c) => {
  try {
    const body = await c.req.json();
    const { password, feedbackId, status } = body;

    // Simple password check
    const adminPassword = Deno.env.get('ADMIN_PASSWORD') || 'admin123';
    if (password !== adminPassword) {
      return c.json({ error: "Invalid password" }, 401);
    }

    // Validate required fields
    if (!feedbackId || !status) {
      return c.json({ error: "Feedback ID and status are required" }, 400);
    }

    // Get the current feedback data
    const currentFeedback = await kv.get(feedbackId);
    if (!currentFeedback) {
      return c.json({ error: "Feedback not found" }, 404);
    }

    // Update the feedback with new status
    await kv.set(feedbackId, {
      ...currentFeedback,
      status,
      updatedAt: new Date().toISOString()
    });

    console.log(`Feedback ${feedbackId} status updated to ${status}`);

    return c.json({ 
      success: true, 
      message: "Feedback status updated successfully"
    });
  } catch (error) {
    console.error("Error updating feedback:", error);
    return c.json({ 
      error: "Failed to update feedback",
      details: error instanceof Error ? error.message : String(error)
    }, 500);
  }
});

// ========================================
// AI AGENT ENDPOINTS
// ========================================

// Generate temporary demo access password
app.post("/make-server-1bf47000/agent/generate-demo-access", async (c) => {
  try {
    console.log('Generating demo access...');
    
    // Generate a strong random password
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZabcdefghjkmnpqrstuvwxyz23456789!@#$%';
    let tempPassword = '';
    for (let i = 0; i < 12; i++) {
      tempPassword += chars.charAt(Math.floor(Math.random() * chars.length));
    }

    // Set expiration time (15 minutes from now)
    const expiresAt = new Date(Date.now() + 15 * 60 * 1000).toISOString();

    // Store in KV with temp password as key
    const demoAccessKey = `demo_access_${tempPassword}`;
    
    try {
      await kv.set(demoAccessKey, {
        password: tempPassword,
        role: 'recruiter_viewer',
        expiresAt: expiresAt,
        createdAt: new Date().toISOString()
      });
      console.log(`Demo access stored: ${demoAccessKey}, expires at ${expiresAt}`);
    } catch (kvError) {
      console.error('KV store error:', kvError);
      throw new Error(`KV store failed: ${kvError instanceof Error ? kvError.message : String(kvError)}`);
    }

    return c.json({
      success: true,
      password: tempPassword,
      expiresAt: expiresAt
    });
  } catch (error) {
    console.error("Error generating demo access:", error);
    return c.json({
      error: "Failed to generate demo access",
      details: error instanceof Error ? error.message : String(error)
    }, 500);
  }
});

// Verify admin access for agent (now accepts temp passwords too)
app.post("/make-server-1bf47000/agent/verify", async (c) => {
  try {
    const body = await c.req.json();
    const { password } = body;

    const agentPassword = Deno.env.get('AGENT_PASSWORD') || Deno.env.get('ADMIN_PASSWORD') || 'admin123';
    
    // Check if it's the main password
    if (password === agentPassword) {
      return c.json({ success: true, role: 'admin' });
    }

    // Check if it's a temporary demo password
    const demoAccessKey = `demo_access_${password}`;
    const demoAccess = await kv.get(demoAccessKey);
    
    if (demoAccess) {
      // Check if expired
      const expiresAt = new Date(demoAccess.expiresAt).getTime();
      const now = Date.now();
      
      if (now > expiresAt) {
        // Delete expired password
        await kv.del(demoAccessKey);
        return c.json({ error: "Demo password expired. Request a new one." }, 401);
      }
      
      return c.json({ success: true, role: 'viewer' });
    }

    return c.json({ error: "Invalid password" }, 401);
  } catch (error) {
    console.error("Agent auth error:", error);
    return c.json({ 
      error: "Authentication failed",
      details: error instanceof Error ? error.message : String(error)
    }, 500);
  }
});

// Get agent jobs
app.post("/make-server-1bf47000/agent/jobs", async (c) => {
  try {
    const body = await c.req.json();
    const { password } = body;

    const agentPassword = Deno.env.get('AGENT_PASSWORD') || Deno.env.get('ADMIN_PASSWORD') || 'admin123';
    if (password !== agentPassword) {
      return c.json({ error: "Invalid password" }, 401);
    }

    // Get all jobs from KV store
    const jobs = await kv.getByPrefix('job_');
    
    // Sort by score (highest first), then by date
    const sortedJobs = jobs.sort((a: any, b: any) => {
      if (b.value.score !== a.value.score) {
        return b.value.score - a.value.score;
      }
      const dateA = new Date(a.value.created_at).getTime();
      const dateB = new Date(b.value.created_at).getTime();
      return dateB - dateA;
    });

    return c.json({ 
      success: true, 
      jobs: sortedJobs.map((job: any) => ({
        id: job.key,
        ...job.value
      }))
    });
  } catch (error) {
    console.error("Error fetching jobs:", error);
    return c.json({ 
      error: "Failed to fetch jobs",
      details: error instanceof Error ? error.message : String(error)
    }, 500);
  }
});

// Get agent runs
app.post("/make-server-1bf47000/agent/runs", async (c) => {
  try {
    const body = await c.req.json();
    const { password } = body;

    const agentPassword = Deno.env.get('AGENT_PASSWORD') || Deno.env.get('ADMIN_PASSWORD') || 'admin123';
    if (password !== agentPassword) {
      return c.json({ error: "Invalid password" }, 401);
    }

    // Get all runs from KV store
    const runs = await kv.getByPrefix('agent_run_');
    
    // Sort by date (newest first)
    const sortedRuns = runs.sort((a: any, b: any) => {
      const dateA = new Date(a.value.run_date).getTime();
      const dateB = new Date(b.value.run_date).getTime();
      return dateB - dateA;
    });

    return c.json({ 
      success: true, 
      runs: sortedRuns.slice(0, 10).map((run: any) => ({ // Limit to 10 most recent
        id: run.key,
        ...run.value
      }))
    });
  } catch (error) {
    console.error("Error fetching runs:", error);
    return c.json({ 
      error: "Failed to fetch runs",
      details: error instanceof Error ? error.message : String(error)
    }, 500);
  }
});

// Get agent stats
app.post("/make-server-1bf47000/agent/stats", async (c) => {
  try {
    const body = await c.req.json();
    const { password } = body;

    const agentPassword = Deno.env.get('AGENT_PASSWORD') || Deno.env.get('ADMIN_PASSWORD') || 'admin123';
    if (password !== agentPassword) {
      return c.json({ error: "Invalid password" }, 401);
    }

    // Get all jobs and runs
    const jobs = await kv.getByPrefix('job_');
    const runs = await kv.getByPrefix('agent_run_');

    const totalJobs = jobs.length;
    const highMatches = jobs.filter((job: any) => job.value.score >= 75).length;
    const pendingReview = jobs.filter((job: any) => !job.value.is_emailed && job.value.score >= 75).length;
    
    // Get last run date
    const sortedRuns = runs.sort((a: any, b: any) => {
      const dateA = new Date(a.value.run_date).getTime();
      const dateB = new Date(b.value.run_date).getTime();
      return dateB - dateA;
    });
    const lastRun = sortedRuns.length > 0 ? sortedRuns[0].value.run_date : null;
    
    // Get AI usage stats
    const aiUsage = await getAIUsageStats();

    return c.json({ 
      success: true, 
      stats: {
        total_jobs: totalJobs,
        high_matches: highMatches,
        pending_review: pendingReview,
        last_run: lastRun,
        ai_calls_today: aiUsage.today,
        ai_calls_month: aiUsage.month
      }
    });
  } catch (error) {
    console.error("Error fetching stats:", error);
    return c.json({ 
      error: "Failed to fetch stats",
      details: error instanceof Error ? error.message : String(error)
    }, 500);
  }
});

// Run the agent (orchestrator)
app.post("/make-server-1bf47000/agent/run", async (c) => {
  try {
    const body = await c.req.json();
    const { password } = body;

    const agentPassword = Deno.env.get('AGENT_PASSWORD') || Deno.env.get('ADMIN_PASSWORD') || 'admin123';
    if (password !== agentPassword) {
      return c.json({ error: "Invalid password" }, 401);
    }

    const runId = `agent_run_${Date.now()}_${Math.random().toString(36).substring(7)}`;
    const runDate = new Date().toISOString();
    
    let jobsScraped = 0;
    let jobsInserted = 0;
    let jobsFiltered = 0;
    let jobsHeuristicScored = 0;
    let jobsAIScored = 0;
    let aiCallsUsed = 0;
    let highMatches = 0;
    let emailsSent = 0;
    let status = 'success';
    let errorMessage = '';

    try {
      // Check AI usage limits
      const aiUsage = await getAIUsageStats();
      const canUseAI = aiUsage.today < MAX_AI_PER_DAY && aiUsage.month < MAX_AI_PER_MONTH;
      const aiQuotaRemaining = Math.min(
        MAX_AI_PER_DAY - aiUsage.today,
        MAX_AI_PER_MONTH - aiUsage.month
      );
      
      console.log(`AI Usage - Today: ${aiUsage.today}/${MAX_AI_PER_DAY}, Month: ${aiUsage.month}/${MAX_AI_PER_MONTH}`);

      // Step 1: Scrape jobs
      const scrapedJobs = await scrapeJobs();
      jobsScraped = scrapedJobs.length;
      console.log(`Scraped ${jobsScraped} jobs`);

      // Step 2: Insert new jobs (deduplicate)
      const newJobs = [];
      for (const job of scrapedJobs) {
        const jobId = `job_${job.external_id}`;
        const existing = await kv.get(jobId);
        
        if (!existing) {
          newJobs.push({ id: jobId, data: job });
        }
      }
      jobsInserted = newJobs.length;
      console.log(`${jobsInserted} new jobs to process`);

      // Step 3: LAYER 1 - Apply hard filters
      const filteredJobs = newJobs.filter(job => passesHardFilters(job.data));
      jobsFiltered = filteredJobs.length;
      console.log(`${jobsFiltered} jobs passed hard filters`);

      // Step 4: LAYER 2 - Calculate heuristic scores
      const heuristicScoredJobs = filteredJobs.map(job => ({
        ...job,
        heuristicScore: calculateHeuristicScore(job.data)
      }));

      // Keep only jobs with heuristic score >= threshold
      const qualifiedJobs = heuristicScoredJobs.filter(job => job.heuristicScore >= HEURISTIC_THRESHOLD);
      jobsHeuristicScored = qualifiedJobs.length;
      console.log(`${jobsHeuristicScored} jobs passed heuristic threshold (>=${HEURISTIC_THRESHOLD})`);

      // Step 5: Sort by heuristic score (highest first)
      qualifiedJobs.sort((a, b) => b.heuristicScore - a.heuristicScore);

      // Step 6: Separate by region for balanced quota
      const nigeriaJobs = qualifiedJobs.filter(job => {
        const loc = job.data.location.toLowerCase();
        return loc.includes('nigeria') || loc.includes('lagos') || loc.includes('africa');
      });
      const globalJobs = qualifiedJobs.filter(job => !nigeriaJobs.includes(job));

      // Step 7: LAYER 3 - Apply AI scoring with regional quotas
      const jobsForAI: any[] = [];
      
      if (canUseAI && aiQuotaRemaining > 0) {
        // Take up to NIGERIA_QUOTA from Nigeria jobs
        const nigeriaQuota = Math.min(NIGERIA_QUOTA, nigeriaJobs.length, aiQuotaRemaining);
        jobsForAI.push(...nigeriaJobs.slice(0, nigeriaQuota));
        
        // Reallocate unused Nigeria quota to Global
        const remainingQuota = aiQuotaRemaining - nigeriaQuota;
        const globalQuota = Math.min(GLOBAL_QUOTA + (NIGERIA_QUOTA - nigeriaQuota), globalJobs.length, remainingQuota);
        jobsForAI.push(...globalJobs.slice(0, globalQuota));
        
        console.log(`AI Scoring: ${nigeriaQuota} Nigeria jobs, ${globalQuota} Global jobs`);
      }

      // Step 8: Auto-approve high heuristic scores
      const autoApproved = qualifiedJobs.filter(job => job.heuristicScore >= AUTO_APPROVE_THRESHOLD);
      console.log(`${autoApproved.length} jobs auto-approved (heuristic >=${AUTO_APPROVE_THRESHOLD})`);

      // Save auto-approved jobs
      for (const job of autoApproved) {
        await kv.set(job.id, {
          ...job.data,
          created_at: new Date().toISOString(),
          is_emailed: false,
          score: job.heuristicScore,
          score_reason: `Auto-approved with heuristic score ${job.heuristicScore}`
        });
        
        if (job.heuristicScore >= 75) {
          highMatches++;
        }
      }

      // Step 9: AI score selected jobs (if quota available)
      if (canUseAI && jobsForAI.length > 0) {
        const aiScores = await scoreJobsWithAI(jobsForAI.map(j => j.data));
        jobsAIScored = aiScores.size;
        aiCallsUsed = jobsAIScored;
        
        console.log(`AI scored ${jobsAIScored} jobs`);

        // Save AI-scored jobs
        for (const job of jobsForAI) {
          const aiScore = aiScores.get(job.data.external_id);
          if (aiScore) {
            await kv.set(job.id, {
              ...job.data,
              created_at: new Date().toISOString(),
              is_emailed: false,
              score: aiScore.final_score,
              score_reason: aiScore.reasoning
            });
            
            if (aiScore.final_score >= 75) {
              highMatches++;
            }
          }
        }
      } else {
        console.log('AI quota exhausted or unavailable - using heuristic only');
      }

      // Step 10: Save remaining jobs with heuristic scores only
      const jobsNotAIScored = qualifiedJobs.filter(
        job => !autoApproved.includes(job) && !jobsForAI.includes(job)
      );
      
      for (const job of jobsNotAIScored) {
        await kv.set(job.id, {
          ...job.data,
          created_at: new Date().toISOString(),
          is_emailed: false,
          score: job.heuristicScore,
          score_reason: `Heuristic score: ${job.heuristicScore} (AI quota not available)`
        });
        
        if (job.heuristicScore >= 75) {
          highMatches++;
        }
      }

      // Step 11: Send email notifications for high matches
      const allJobs = await kv.getByPrefix('job_');
      const highMatchJobs = allJobs.filter(
        (job: any) => job.value.score >= 75 && !job.value.is_emailed
      );
      
      if (highMatchJobs.length > 0) {
        // Mark as emailed
        for (const job of highMatchJobs) {
          await kv.set(job.key, {
            ...job.value,
            is_emailed: true
          });
        }
        emailsSent = highMatchJobs.length;
      }

    } catch (error) {
      status = 'error';
      errorMessage = error instanceof Error ? error.message : String(error);
      console.error('Agent run error:', error);
    }

    // Save run details
    await kv.set(runId, {
      run_date: runDate,
      jobs_scraped: jobsScraped,
      jobs_inserted: jobsInserted,
      jobs_filtered: jobsFiltered,
      jobs_heuristic_scored: jobsHeuristicScored,
      jobs_ai_scored: jobsAIScored,
      ai_calls_used: aiCallsUsed,
      jobs_scored: jobsHeuristicScored + jobsAIScored, // Legacy compatibility
      high_matches: highMatches,
      emails_sent: emailsSent,
      status,
      error_message: errorMessage
    });

    return c.json({ 
      success: true,
      run: {
        id: runId,
        jobs_scraped: jobsScraped,
        jobs_inserted: jobsInserted,
        jobs_filtered: jobsFiltered,
        jobs_heuristic_scored: jobsHeuristicScored,
        jobs_ai_scored: jobsAIScored,
        ai_calls_used: aiCallsUsed,
        high_matches: highMatches,
        emails_sent: emailsSent,
        status
      }
    });
  } catch (error) {
    console.error("Error running agent:", error);
    return c.json({ 
      error: "Failed to run agent",
      details: error instanceof Error ? error.message : String(error)
    }, 500);
  }
});

// ========================================
// AGENT HELPER FUNCTIONS
// ========================================

// Configuration constants
const MAX_AI_PER_DAY = 15;
const MAX_AI_PER_MONTH = 300;
const HEURISTIC_THRESHOLD = 60;
const AUTO_APPROVE_THRESHOLD = 85;
const MAX_DESCRIPTION_LENGTH = 700;
const GLOBAL_QUOTA = 10;
const NIGERIA_QUOTA = 5;

// Layer 1: Hard filters - immediately discard jobs
function passesHardFilters(job: any): boolean {
  const titleLower = job.title.toLowerCase();
  const descLower = job.description.toLowerCase();
  
  // Must contain React OR Next.js
  const hasReactOrNext = 
    titleLower.includes('react') || 
    descLower.includes('react') ||
    titleLower.includes('next.js') || 
    titleLower.includes('nextjs') ||
    descLower.includes('next.js') || 
    descLower.includes('nextjs');
  
  if (!hasReactOrNext) return false;
  
  // Must be Remote OR Nigeria-based
  const locationLower = job.location.toLowerCase();
  const isRemoteOrNigeria = 
    job.remote_type === 'fully_remote' || 
    locationLower.includes('nigeria') ||
    locationLower.includes('lagos') ||
    locationLower.includes('africa');
  
  if (!isRemoteOrNigeria) return false;
  
  // Exclude explicit Senior-only roles
  const experienceLower = job.experience_level?.toLowerCase() || '';
  const isSeniorOnly = 
    experienceLower === 'senior' && 
    (titleLower.includes('senior') || descLower.includes('senior only'));
  
  if (isSeniorOnly) return false;
  
  // Exclude low salary (if exists)
  if (job.salary_min_usd && job.salary_min_usd < 2000) return false;
  
  return true;
}

// Layer 2: Heuristic scoring - score without AI
function calculateHeuristicScore(job: any): number {
  let score = 0;
  
  const titleLower = job.title.toLowerCase();
  const descLower = job.description.toLowerCase();
  const locationLower = job.location.toLowerCase();
  
  // +30 if title contains "React"
  if (titleLower.includes('react')) score += 30;
  
  // +20 if tech stack includes "Next.js"
  const techStackLower = job.tech_stack?.map((t: string) => t.toLowerCase()) || [];
  if (techStackLower.some((t: string) => t.includes('next') || t === 'nextjs')) {
    score += 20;
  }
  
  // +20 if fully remote
  if (job.remote_type === 'fully_remote') score += 20;
  
  // +15 if Nigeria-based
  if (locationLower.includes('nigeria') || locationLower.includes('lagos') || locationLower.includes('africa')) {
    score += 15;
  }
  
  // +20 if salary >= $2,000
  if (job.salary_min_usd && job.salary_min_usd >= 2000) score += 20;
  
  // +10 if Mid-level role
  const experienceLower = job.experience_level?.toLowerCase() || '';
  if (experienceLower === 'mid' || experienceLower === 'mid-level') score += 10;
  
  return score;
}

// Get AI usage stats
async function getAIUsageStats() {
  const today = new Date().toISOString().split('T')[0]; // YYYY-MM-DD
  const currentMonth = new Date().toISOString().substring(0, 7); // YYYY-MM
  
  // Get today's usage
  const todayKey = `ai_usage_${today}`;
  const todayUsage = await kv.get(todayKey) || { count: 0 };
  
  // Get month's usage
  const monthKey = `ai_usage_month_${currentMonth}`;
  const monthUsage = await kv.get(monthKey) || { count: 0 };
  
  return {
    today: todayUsage.count || 0,
    month: monthUsage.count || 0
  };
}

// Increment AI usage counter
async function incrementAIUsage() {
  const today = new Date().toISOString().split('T')[0];
  const currentMonth = new Date().toISOString().substring(0, 7);
  
  // Increment today
  const todayKey = `ai_usage_${today}`;
  const todayUsage = await kv.get(todayKey) || { count: 0 };
  await kv.set(todayKey, { count: (todayUsage.count || 0) + 1, date: today });
  
  // Increment month
  const monthKey = `ai_usage_month_${currentMonth}`;
  const monthUsage = await kv.get(monthKey) || { count: 0 };
  await kv.set(monthKey, { count: (monthUsage.count || 0) + 1, month: currentMonth });
}

// Trim description to max length
function trimDescription(description: string): string {
  if (description.length <= MAX_DESCRIPTION_LENGTH) return description;
  return description.substring(0, MAX_DESCRIPTION_LENGTH) + '...';
}

// Mock job scraping function
async function scrapeJobs() {
  // In production, this would scrape actual job boards
  // For now, return mock data
  const mockJobs = [
    {
      external_id: `remote_ok_${Date.now()}_1`,
      source: 'remoteok',
      title: 'Senior React Developer',
      company: 'TechCorp',
      location: 'Remote - Worldwide',
      salary_min_usd: 2500,
      salary_max_usd: 3500,
      salary_original: '$2.5k - $3.5k/month',
      tech_stack: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS'],
      remote_type: 'fully_remote',
      experience_level: 'mid',
      job_url: 'https://example.com/job1',
      description: 'We are looking for a senior React developer with 2-4 years of experience...'
    },
    {
      external_id: `remote_ok_${Date.now()}_2`,
      source: 'remoteok',
      title: 'Full Stack Engineer',
      company: 'StartupXYZ',
      location: 'Remote - Africa',
      salary_min_usd: 2000,
      salary_max_usd: 3000,
      salary_original: '$2k - $3k/month',
      tech_stack: ['React', 'Node.js', 'PostgreSQL'],
      remote_type: 'fully_remote',
      experience_level: 'mid',
      job_url: 'https://example.com/job2',
      description: 'Join our growing startup as a full stack engineer...'
    }
  ];

  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  return mockJobs;
}

// OpenAI scoring function (batched)
async function scoreJobsWithAI(jobs: any[]): Promise<Map<string, any>> {
  const openAIKey = Deno.env.get('OPENAI_API_KEY');
  const results = new Map<string, any>();
  
  // If no OpenAI key, use heuristic fallback
  if (!openAIKey) {
    console.log('No OpenAI key - using heuristic scoring');
    for (const job of jobs) {
      const heuristicScore = calculateHeuristicScore(job);
      results.set(job.external_id, {
        final_score: heuristicScore,
        reasoning: 'Scored using heuristic method (no OpenAI key provided)'
      });
    }
    return results;
  }
  
  // Batch jobs in groups of 5
  const batchSize = 5;
  for (let i = 0; i < jobs.length; i += batchSize) {
    const batch = jobs.slice(i, i + batchSize);
    
    try {
      // Build prompt for batch
      const prompt = `You are a job matching AI. Score these ${batch.length} jobs for a React/Next.js developer.

Criteria:
- Tech stack match (React/Next.js preferred)
- Salary range ($2k-$3.5k/month ideal)
- Remote-friendly
- Mid-level experience

For each job, provide:
1. Score (0-100)
2. Brief reason (1 sentence)

Jobs:
${batch.map((job, idx) => `
Job ${idx + 1}:
Title: ${job.title}
Company: ${job.company}
Location: ${job.location}
Salary: ${job.salary_original || 'Not specified'}
Tech: ${job.tech_stack?.join(', ') || 'Not specified'}
Experience: ${job.experience_level || 'Not specified'}
Description: ${trimDescription(job.description)}
`).join('\n---\n')}

Respond in JSON format:
[
  {"job": 1, "score": 85, "reason": "Strong React/Next.js match with good salary"},
  {"job": 2, "score": 70, "reason": "Good fit but lower salary range"}
]`;

      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${openAIKey}`
        },
        body: JSON.stringify({
          model: 'gpt-4o-mini',
          temperature: 0,
          messages: [
            { role: 'system', content: 'You are a precise job matching assistant. Always respond with valid JSON.' },
            { role: 'user', content: prompt }
          ]
        })
      });
      
      if (!response.ok) {
        throw new Error(`OpenAI API error: ${response.statusText}`);
      }
      
      const data = await response.json();
      const content = data.choices[0].message.content;
      
      // Parse JSON response
      const scores = JSON.parse(content);
      
      // Map scores back to jobs
      scores.forEach((result: any, idx: number) => {
        if (batch[idx]) {
          results.set(batch[idx].external_id, {
            final_score: result.score,
            reasoning: result.reason
          });
          
          // Increment AI usage counter
          incrementAIUsage();
        }
      });
      
    } catch (error) {
      console.error('Error scoring batch:', error);
      // Fallback to heuristic for this batch
      for (const job of batch) {
        const heuristicScore = calculateHeuristicScore(job);
        results.set(job.external_id, {
          final_score: heuristicScore,
          reasoning: 'AI scoring failed, using heuristic fallback'
        });
      }
    }
  }
  
  return results;
}

// Mock OpenAI scoring function (for jobs that need AI)
async function scoreJob(job: any) {
  // This is the old function - now replaced by scoreJobsWithAI
  // Keeping for backward compatibility
  const heuristicScore = calculateHeuristicScore(job);
  
  return {
    salary_score: job.salary_min_usd >= 2000 ? 100 : 70,
    stack_score: 80,
    remote_score: job.remote_type === 'fully_remote' ? 100 : 50,
    experience_score: job.experience_level === 'mid' ? 100 : 70,
    company_score: 75,
    final_score: heuristicScore,
    reasoning: `Heuristic score: ${heuristicScore}`
  };
}

Deno.serve(app.fetch);