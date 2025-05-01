const express = require('express');
const router = express.Router();
const supabase = require('../tools/supabase'); // adjust path if needed

router.get('/test-supabase', async (req, res) => {
  const { data, error } = await supabase.from('users').select('*').limit(1);

  if (error) {
    return res.status(500).json({ message: 'Supabase error', error });
  }

  res.status(200).json({ message: 'Supabase connected ✅', data });
});

module.exports = router;
