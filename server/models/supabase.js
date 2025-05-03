require('dotenv').config(); // Load environment variables

const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;

if (!supabaseUrl || !supabaseKey) {
  throw new Error('Supabase URL and Key must be provided in the environment variables.');
}

const connect = () => createClient(supabaseUrl, supabaseKey);

module.exports = { connect };
