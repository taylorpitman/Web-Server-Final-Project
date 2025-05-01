const express = require('express');
const app = express();
const PORT = 8000;
require('dotenv').config();

const testRoutes = require('./routes/test.js');
const analyticsRoutes = require('./routes/analytics.js');
const friendsRoutes = require('./routes/friends.js');
const usersRoutes = require('./routes/users.js');
const subjectRoutes = require('./routes/subjects.js');
const sessionRoutes = require('./routes/sessions.js');
const postRoutes = require('./routes/posts.js');


app.use('/api', testRoutes);
app.use('/api/analytics', analyticsRoutes);
app.use('/api/friends', friendsRoutes);
app.use('/api/users', usersRoutes);
app.use('/api/subjects', subjectRoutes);
app.use('/api/sessions', sessionRoutes);
app.use('/api/posts', postRoutes);
app.use(express.json());

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}/`);
});

