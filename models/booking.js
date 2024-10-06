const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Booking = sequelize.define('Booking', {
  eventId: DataTypes.INTEGER,
  userId: DataTypes.INTEGER,
  status: DataTypes.STRING,
});

module.exports = Booking;
