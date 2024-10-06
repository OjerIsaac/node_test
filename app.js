const express = require('express');
const bodyParser = require('body-parser');
const eventRoutes = require('./routes/eventRoutes');
const sequelize = require('./config/db'); 

const app = express();

app.use(bodyParser.json());

app.use(eventRoutes);

sequelize.sync()
  .then(() => console.log('Database synced'))
  .catch((err) => console.log('Error syncing database:', err));

module.exports = app;
