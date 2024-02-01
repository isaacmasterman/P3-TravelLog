const authRoutes = require('./routes/authRoutes');

require('dotenv').config();

app.use('/api', authRoutes);