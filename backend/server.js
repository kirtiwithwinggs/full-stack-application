const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const db = require('./models');
const app = express();
dotenv.config();



// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/items', require('./routes/items'));

const PORT = process.env.PORT || 5000;

// Sync database and start server
db.sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});
