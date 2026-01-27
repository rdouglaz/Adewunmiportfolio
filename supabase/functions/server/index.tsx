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

Deno.serve(app.fetch);