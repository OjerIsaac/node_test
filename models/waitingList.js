const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const WaitingList = sequelize.define('WaitingList', {
  eventId: DataTypes.INTEGER,
  userId: DataTypes.INTEGER,
  position: DataTypes.INTEGER,
});

module.exports = WaitingList;
