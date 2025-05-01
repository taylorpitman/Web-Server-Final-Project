require('dotenv').config(); // Load environment variables

const { createClient } = require('@supabase/supabase-js')

module.exports = {
    connect(){
        return createClient(process.env.DATABASE_URL, process.env.SUPABASE_SECRET_KEY)
    }

    
}
