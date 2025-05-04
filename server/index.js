const express = require('express');
const app = express();
const PORT = 8000;
require('dotenv').config();
const cors = require('cors');

app.use(cors());
app.use(express.json());
const sessionsRoutes = require('./routes/sessionsRoutes.js'); // Changed from import to require
const analyticsRoutes = require('./routes/analyticsRoutes.js');
const friendsRoutes = require('./routes/friendsRoutes.js');
const usersRoutes = require('./routes/usersRoutes.js');
const subjectsRoutes = require('./routes/subjectsRoutes.js');
const postsRoutes = require('./routes/postsRoutes.js');

app.use('/api/analytics', analyticsRoutes);
app.use('/api/friends', friendsRoutes);
app.use('/api/users', usersRoutes);
app.use('/api/subjects', subjectsRoutes);
app.use('/api/sessions', sessionsRoutes);
app.use('/api/posts', postsRoutes);


app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}/`);
});

