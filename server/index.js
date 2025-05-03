const express = require('express');
const app = express();
const PORT = 8000;
require('dotenv').config();

const sessionRoutes = require('./routes/sessionRoutes.js'); // Changed from import to require
const testRoutes = require('./routes/test.js');
// const analyticsRoutes = require('./routes/analyticsRoutes.js');
// const friendsRoutes = require('./routes/friendsRoutes.js');
const usersRoutes = require('./routes/usersRoutes.js');
// const subjectRoutes = require('./routes/subjectsRoutes.js');
// const postRoutes = require('./routes/postsRoutes.js');

app.use('/api', testRoutes);
// app.use('/api/analytics', analyticsRoutes);
// app.use('/api/friends', friendsRoutes);
app.use('/api/users', usersRoutes);
// app.use('/api/subjects', subjectRoutes);
app.use('/api/sessions', sessionRoutes);
// app.use('/api/posts', postRoutes);
app.use(express.json());

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}/`);
});

