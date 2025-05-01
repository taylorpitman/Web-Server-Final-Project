const express = require('express');
const PORT = 8000;

const app = express();

const testRoutes = require('./routes/test.js');

app.use('/api', testRoutes);


app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}/`);
});

