const { createClient } = require('@supabase/supabase-js');

// Fill in your Supabase credentials here
const supabaseUrl = 'https://rfdihetfofhgnpmictpp.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJmZGloZXRmb2ZoZ25wbWljdHBwIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc0NjExNjk5MSwiZXhwIjoyMDYxNjkyOTkxfQ.WyFIUpqgZ-c_ME1PIXtfsDVMf4WoZn39KqB3_2Owixg';
const supabase = createClient(supabaseUrl, supabaseKey);

(async () => {
  const sessionData = {
    user_id: 1,
    subject_id: 2,
    start_time: '2025-05-01T10:00:00.000Z',
    end_time: '2025-05-01T10:25:00.000Z',
    is_active: true
  };

  const { data, error } = await supabase
    .from('sessions')
    .insert(sessionData)
    .select('*');

  console.log('Insert Result:', data);
  console.log('Insert Error:', error);
})();
