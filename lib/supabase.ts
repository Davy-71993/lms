import { createClient } from '@supabase/supabase-js'

// Create a single supabase client for interacting with your database
const supabase = createClient('https://enidoyssspvktueicsrf.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVuaWRveXNzc3B2a3R1ZWljc3JmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzIxOTY4NDYsImV4cCI6MjA0Nzc3Mjg0Nn0.FMLPXxT_wB2UD07ldmxRB-axQKghjdbeqnyHcjS2nlc')

export default supabase
