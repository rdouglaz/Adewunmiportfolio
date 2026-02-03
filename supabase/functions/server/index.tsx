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

Deno.serve(app.fetch);