const rideModel = require("../models/ride.model");
const crypto = require("crypto");
const captainModel = require("../models/captain.model");

// Fixed fare for IITR Campus Ride
module.exports.getRideFare = async (pickup, destination) => {
  if (!pickup || !destination) {
    throw new Error("Pickup and destination are required");
  }

  return {
    erickshaw: 10,
  };
};

// Generate OTP function
module.exports.generateOTP = () => {
  return crypto.randomInt(1000, 10000);
};

// Book Ride
module.exports.bookRide = async ({
  userId,
  pickup,
  destination,
  vehicleType,
}) => {
  if (!userId || !pickup || !destination || !vehicleType) {
    throw new Error("All fields are required");
  }

  const ride = await rideModel.create({
    userId,
    pickup,
    destination,
    otp: this.generateOTP(),
    fare: 10,
  });

  return ride;
};

// Get captains in radius
module.exports.getCaptainsInTheRadius = async (
  ltd,
  lng,
  radius,
  vehicleType
) => {
  if (!ltd || !lng || !radius) {
    throw new Error("Latitude, longitude, and radius are required");
  }

  const captains = await captainModel.aggregate([
    {
      $geoNear: {
        near: {
          type: "Point",
          coordinates: [lng, ltd],
        },
        distanceField: "distance",
        maxDistance: radius * 1000,
        spherical: true,
        key: "location",
      },
    },
  ]);

  return captains;
};

// Confirm Ride
module.exports.confirmRide = async ({ rideId, captain }) => {
  if (!rideId) {
    throw new Error("Ride id is required");
  }

  const ride = await rideModel
    .findOneAndUpdate(
      { _id: rideId },
      {
        status: "accepted",
        captainId: captain._id,
      },
      { new: true }
    )
    .populate("userId")
    .populate("captainId")
    .select("+otp");

  if (!ride) {
    throw new Error("Ride not found");
  }

  return ride;
};

// Start Ride
module.exports.startRide = async ({ rideId, otp, captain }) => {
  if (!rideId || !otp || !captain) {
    throw new Error("Ride id and OTP are required");
  }

  const ride = await rideModel
    .findOneAndUpdate(
      {
        _id: rideId,
        captainId: captain._id,
        otp,
      },
      {
        status: "ongoing",
      },
      { new: true }
    )
    .populate("userId")
    .populate("captainId")
    .select("+otp");

  if (!ride) {
    throw new Error("Ride not found");
  }

  return ride;
};

// End Ride
module.exports.endRide = async ({ rideId, captain }) => {
  if (!rideId) {
    throw new Error("Ride id is required");
  }

  const ride = await rideModel
    .findOneAndUpdate(
      {
        _id: rideId,
        captainId: captain._id,
      },
      {
        status: "completed",
      },
      { new: true }
    )
    .populate("userId")
    .populate("captainId");

  if (!ride) {
    throw new Error("Ride not found");
  }

  await captainModel.findByIdAndUpdate(captain._id, {
    $inc: {
      earnings: ride.fare,
      completedRides: 1,
    },
  });

  return ride;
};