import { Hono } from "npm:hono";
import { cors } from "npm:hono/cors";
import { logger } from "npm:hono/logger";
import { createClient } from "npm:@supabase/supabase-js@2";
import * as kv from "./kv_store.tsx";
const app = new Hono();

// Create Supabase clients
const supabaseAdmin = createClient(
  Deno.env.get('SUPABASE_URL')!,
  Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
);

const supabase = createClient(
  Deno.env.get('SUPABASE_URL')!,
  Deno.env.get('SUPABASE_ANON_KEY')!
);

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
app.get("/make-server-3ff7222b/health", (c) => {
  return c.json({ status: "ok" });
});

// Sign up endpoint
app.post("/make-server-3ff7222b/signup", async (c) => {
  try {
    const { email, password, name } = await c.req.json();

    if (!email || !password || !name) {
      return c.json({ error: 'Email, password, and name are required' }, 400);
    }

    const { data, error } = await supabaseAdmin.auth.admin.createUser({
      email,
      password,
      user_metadata: { name },
      // Automatically confirm the user's email since an email server hasn't been configured
      email_confirm: true
    });

    if (error) {
      console.error('Signup error:', error);
      return c.json({ error: error.message }, 400);
    }

    return c.json({ user: data.user });
  } catch (error) {
    console.error('Signup error:', error);
    return c.json({ error: 'Failed to create user' }, 500);
  }
});

// Save order endpoint (requires authentication)
app.post("/make-server-3ff7222b/orders", async (c) => {
  try {
    const accessToken = c.req.header('Authorization')?.split(' ')[1];
    
    if (!accessToken) {
      return c.json({ error: 'Unauthorized: No access token provided' }, 401);
    }

    const { data: { user }, error: authError } = await supabaseAdmin.auth.getUser(accessToken);
    
    if (authError || !user?.id) {
      console.error('Authorization error while saving order:', authError);
      return c.json({ error: 'Unauthorized: Invalid or expired token' }, 401);
    }

    const order = await c.req.json();
    const orderId = `order_${user.id}_${Date.now()}`;
    
    await kv.set(orderId, {
      ...order,
      userId: user.id,
      id: orderId
    });

    return c.json({ success: true, orderId });
  } catch (error) {
    console.error('Error saving order:', error);
    return c.json({ error: 'Failed to save order' }, 500);
  }
});

// Get user orders endpoint (requires authentication)
app.get("/make-server-3ff7222b/orders", async (c) => {
  try {
    const accessToken = c.req.header('Authorization')?.split(' ')[1];
    
    if (!accessToken) {
      return c.json({ error: 'Unauthorized: No access token provided' }, 401);
    }

    const { data: { user }, error: authError } = await supabaseAdmin.auth.getUser(accessToken);
    
    if (authError || !user?.id) {
      console.error('Authorization error while fetching orders:', authError);
      return c.json({ error: 'Unauthorized: Invalid or expired token' }, 401);
    }

    const prefix = `order_${user.id}_`;
    const orders = await kv.getByPrefix(prefix);

    // Sort by createdAt descending
    const sortedOrders = orders.sort((a: any, b: any) => 
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );

    return c.json({ orders: sortedOrders });
  } catch (error) {
    console.error('Error fetching orders:', error);
    return c.json({ error: 'Failed to fetch orders' }, 500);
  }
});

// Update order status endpoint (requires authentication)
app.put("/make-server-3ff7222b/orders/:orderId", async (c) => {
  try {
    const accessToken = c.req.header('Authorization')?.split(' ')[1];
    
    if (!accessToken) {
      return c.json({ error: 'Unauthorized: No access token provided' }, 401);
    }

    const { data: { user }, error: authError } = await supabaseAdmin.auth.getUser(accessToken);
    
    if (authError || !user?.id) {
      console.error('Authorization error while updating order:', authError);
      return c.json({ error: 'Unauthorized: Invalid or expired token' }, 401);
    }

    const orderId = c.req.param('orderId');
    const { status } = await c.req.json();

    const existingOrder = await kv.get(orderId);
    
    if (!existingOrder) {
      return c.json({ error: 'Order not found' }, 404);
    }

    if (existingOrder.userId !== user.id) {
      return c.json({ error: 'Unauthorized: This order does not belong to you' }, 403);
    }

    await kv.set(orderId, {
      ...existingOrder,
      status,
      updatedAt: new Date().toISOString()
    });

    return c.json({ success: true });
  } catch (error) {
    console.error('Error updating order status:', error);
    return c.json({ error: 'Failed to update order status' }, 500);
  }
});

Deno.serve(app.fetch);