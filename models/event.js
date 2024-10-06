const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Event = sequelize.define('Event', {
  name: DataTypes.STRING,
  totalTickets: DataTypes.INTEGER,
  remainingTickets: DataTypes.INTEGER,
});

module.exports = Event;
