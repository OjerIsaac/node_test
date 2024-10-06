const express = require('express');
const eventController = require('../controllers/eventController');
const router = express.Router();

router.post('/initialize', eventController.initializeEvent);

router.post('/book', eventController.bookTicket);

router.post('/cancel', eventController.cancelBooking);

router.get('/status/:eventId', eventController.getStatus);

module.exports = router;
