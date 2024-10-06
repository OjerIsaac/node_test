const Event = require("../models/event");
const Booking = require("../models/booking");
const WaitingList = require("../models/waitingList");
const sequelize = require("../config/db");

exports.initializeEvent = async (req, res) => {
  try {
    const { name, totalTickets } = req.body;
    const event = await Event.create({
      name,
      totalTickets,
      remainingTickets: totalTickets,
    });
    res.status(201).json({ event });
  } catch (error) {
    res.status(500).json({ message: "Error initializing event", error });
  }
};

exports.bookTicket = async (req, res) => {
  const transaction = await sequelize.transaction();
  try {
    const { eventId, userId } = req.body;
    const event = await Event.findByPk(eventId);

    if (event.remainingTickets > 0) {
      await Booking.create(
        { eventId, userId, status: "booked" },
        { transaction }
      );
      event.remainingTickets--;
      await event.save({ transaction });
      await transaction.commit();
      res.status(201).json({ message: "Ticket booked successfully" });
    } else {
      const waitingListEntry = await WaitingList.create(
        { eventId, userId },
        { transaction }
      );
      await transaction.commit();
      res
        .status(200)
        .json({
          message: "Added to waiting list",
          position: waitingListEntry.position,
        });
    }
  } catch (error) {
    await transaction.rollback();
    res.status(500).json({ message: "Error booking ticket", error });
  }
};

exports.cancelBooking = async (req, res) => {
  const transaction = await sequelize.transaction();
  try {
    const { eventId, userId } = req.body;
    const booking = await Booking.findOne({
      where: { eventId, userId, status: "booked" },
    });

    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    await booking.destroy({ transaction });

    const waitingListEntry = await WaitingList.findOne({
      where: { eventId },
      order: [["position", "ASC"]],
    });
    if (waitingListEntry) {
      await Booking.create(
        { eventId, userId: waitingListEntry.userId, status: "booked" },
        { transaction }
      );
      await waitingListEntry.destroy({ transaction });
    } else {
      const event = await Event.findByPk(eventId);
      event.remainingTickets++;
      await event.save({ transaction });
    }

    await transaction.commit();
    res
      .status(200)
      .json({
        message: "Booking cancelled and ticket reassigned if applicable",
      });
  } catch (error) {
    await transaction.rollback();
    res.status(500).json({ message: "Error cancelling booking", error });
  }
};

exports.getStatus = async (req, res) => {
  try {
    const { eventId } = req.params;
    const event = await Event.findByPk(eventId);
    const waitingListCount = await WaitingList.count({ where: { eventId } });

    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    res.status(200).json({
      remainingTickets: event.remainingTickets,
      waitingListCount,
    });
  } catch (error) {
    res.status(500).json({ message: "Error fetching event status", error });
  }
};
