const { validationResult } = require("express-validator");
const rideService = require("../services/ride.service");
const { sendMessageToSocketId } = require("../lib/socket");
const captainModel = require("../models/captain.model");
// Create a new ride controller

module.exports.createRide = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      errors: errors.array(),
    });
  }

  const { pickup, destination, vehicleType } = req.body;

  try {
    const ride = await rideService.bookRide({
      userId: req.user._id,
      pickup,
      destination,
      vehicleType,
    });

    const captains = await captainModel.find({});

    console.log("Ride created");
    console.log("Captains found:", captains.length);

    captains.forEach((captain) => {
      console.log("Sending ride to:", captain.socketId);

      if (captain.socketId) {
        sendMessageToSocketId(captain.socketId, {
          event: "new-ride",
          data: {
            rideDetails: ride,
          },
        });
      }
    });

    return res.status(201).json(ride);
  } catch (err) {
    console.log(err);

    return res.status(500).json({
      message: err.message,
    });
  }
};
  // Get the pickup, destination, and vehicle type from the request body
  
// Get Fare for a ride controller
module.exports.getFare = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  // Get the pickup and destination from the request query
  const { pickup, destination } = req.query;

  try {
    // Get the fare for the given pickup and destination
    const fare = await rideService.getRideFare(pickup, destination);

    // Return the fare for the ride
    return res.status(200).json(fare);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: err.message });
  }
};

// Confirm a ride controller function
module.exports.confirmRide = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  // Get the ride id from the request body
  const { rideId } = req.body;

  try {
    // Confirm the ride with the given ride id
    const ride = await rideService.confirmRide({
      rideId,
      captain: req.captain,
    });

    // Emit the ride-confirmed event to the user
    sendMessageToSocketId(ride.userId.socketId, {
      event: "ride-confirmed",
      data: ride,
    });

    // Return the confirmed ride
    return res.status(200).json(ride);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: err.message });
  }
};

// Start a ride controller function
module.exports.startRide = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  // Get the ride id and otp from the request query
  const { rideId, otp } = req.query;

  try {
    // Start the ride with the given ride id and otp
    const ride = await rideService.startRide({
      rideId,
      otp,
      captain: req.captain,
    });

    // Emit the ride-started event to the user
    sendMessageToSocketId(ride.userId.socketId, {
      event: "ride-started",
      data: ride,
    });

    // Return the started ride
    return res.status(200).json(ride);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: err.message });
  }
};

// End a ride controller function
module.exports.endRide = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  // Get the ride id from the request body
  const { rideId } = req.body;

  try {
    // End the ride with the given ride id
    const ride = await rideService.endRide({ rideId, captain: req.captain });

    // Emit the ride-ended event to the user
    sendMessageToSocketId(ride.userId.socketId, {
      event: "ride-ended",
      data: ride,
    });

    // Return the ended ride
    return res.status(200).json(ride);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: err.message });
  }
};
const Ride = require("../models/ride.model");
const Captain = require("../models/captain.model");

module.exports.submitRating = async (req, res) => {
  try {
    const { rideId, rating } = req.body;

    const ride = await Ride.findById(rideId);

    if (!ride) {
      return res.status(404).json({
        message: "Ride not found",
      });
    }

    ride.rating = rating;
    await ride.save();

    const captain = await Captain.findById(ride.captainId);

    const newTotalRatings =
      (captain.totalRatings || 0) + 1;

    const newRating =
      (
        ((captain.rating || 0) *
          (captain.totalRatings || 0)) +
        rating
      ) / newTotalRatings;

    captain.rating = Number(newRating.toFixed(1));
    captain.totalRatings = newTotalRatings;

    await captain.save();

    res.status(200).json({
      message: "Rating submitted",
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: error.message,
    });
  }
};