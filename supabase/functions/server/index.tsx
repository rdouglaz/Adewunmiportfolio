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

    return c.json({ 
      success: true, 
      stats: {
        total_jobs: totalJobs,
        high_matches: highMatches,
        pending_review: pendingReview,
        last_run: lastRun
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
    let jobsScored = 0;
    let highMatches = 0;
    let emailsSent = 0;
    let status = 'success';
    let errorMessage = '';

    try {
      // Step 1: Scrape jobs
      const scrapedJobs = await scrapeJobs();
      jobsScraped = scrapedJobs.length;

      // Step 2: Insert new jobs (deduplicate)
      for (const job of scrapedJobs) {
        const jobId = `job_${job.external_id}`;
        const existing = await kv.get(jobId);
        
        if (!existing) {
          await kv.set(jobId, {
            ...job,
            created_at: new Date().toISOString(),
            is_emailed: false,
            score: null,
            score_reason: null
          });
          jobsInserted++;
        }
      }

      // Step 3: Score jobs that don't have scores
      const allJobs = await kv.getByPrefix('job_');
      const unscoredJobs = allJobs.filter((job: any) => job.value.score === null);
      
      for (const job of unscoredJobs) {
        try {
          const scoring = await scoreJob(job.value);
          await kv.set(job.key, {
            ...job.value,
            score: scoring.final_score,
            score_reason: scoring.reasoning
          });
          jobsScored++;
          
          if (scoring.final_score >= 75) {
            highMatches++;
          }
        } catch (err) {
          console.error(`Error scoring job ${job.key}:`, err);
        }
      }

      // Step 4: Send email notifications for high matches
      // (Simplified - in production, this would send actual emails)
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
      jobs_scored: jobsScored,
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
        jobs_scored: jobsScored,
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

// Mock OpenAI scoring function
async function scoreJob(job: any) {
  // In production, this would call OpenAI API
  // For now, use simple heuristic scoring
  
  let salaryScore = 0;
  if (job.salary_min_usd >= 2000 && job.salary_max_usd <= 3500) {
    salaryScore = 100;
  } else if (job.salary_min_usd >= 1500) {
    salaryScore = 70;
  } else {
    salaryScore = 40;
  }

  let stackScore = 0;
  const preferredStack = ['react', 'next.js', 'nextjs', 'typescript', 'tailwind'];
  const jobStack = job.tech_stack.map((t: string) => t.toLowerCase());
  const matchedTech = jobStack.filter((t: string) => 
    preferredStack.some(p => t.includes(p))
  );
  stackScore = Math.min(100, (matchedTech.length / 3) * 100);

  let remoteScore = 0;
  if (job.remote_type === 'fully_remote') {
    remoteScore = 100;
  } else if (job.remote_type === 'hybrid') {
    remoteScore = 50;
  }

  let experienceScore = 0;
  if (job.experience_level === 'mid' || job.experience_level === 'junior') {
    experienceScore = 100;
  } else if (job.experience_level === 'senior') {
    experienceScore = 70;
  }

  const companyScore = 75; // Mock score

  const finalScore = Math.round(
    (salaryScore * 0.3) + 
    (stackScore * 0.3) + 
    (remoteScore * 0.2) + 
    (experienceScore * 0.1) + 
    (companyScore * 0.1)
  );

  const reasoning = `Salary range ${job.salary_original} is ${salaryScore >= 80 ? 'excellent' : 'acceptable'}. \nTech stack matches ${matchedTech.length} of your preferred technologies. \n${job.remote_type === 'fully_remote' ? 'Fully remote position.' : 'Not fully remote.'} \nExperience level: ${job.experience_level}.`;

  return {
    salary_score: salaryScore,
    stack_score: stackScore,
    remote_score: remoteScore,
    experience_score: experienceScore,
    company_score: companyScore,
    final_score: finalScore,
    reasoning
  };
}

Deno.serve(app.fetch);