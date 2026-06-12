const socketIo = require("socket.io");
const userModel = require("../models/user.model");
const captainModel = require("../models/captain.model");

// Initialize the socket.io server
let io;

function initializeSocket(server) {
  io = socketIo(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
    },
  });

  io.on("connection", (socket) => {
    console.log(`Client connected: ${socket.id}`);

    // JOIN EVENT
    socket.on("join", async (data) => {
      const { userId, userType } = data;

      console.log("JOIN EVENT:", userId, userType);

      try {
        if (userType === "user") {
          await userModel.findByIdAndUpdate(userId, {
            socketId: socket.id,
          });

          console.log("User socket saved:", socket.id);
        }

        if (userType === "captain") {
          await captainModel.findByIdAndUpdate(userId, {
            socketId: socket.id,
          });

          console.log("Captain socket saved:", socket.id);
        }
      } catch (err) {
        console.log("Join error:", err.message);
      }
    });

    // UPDATE CAPTAIN LOCATION
    socket.on("update-location-captain", async (data) => {
      const { userId, location } = data;

      if (!location || !location.ltd || !location.lng) {
        return socket.emit("error", {
          message: "Invalid location data",
        });
      }

      try {
        await captainModel.findByIdAndUpdate(userId, {
          location: {
            type: "Point",
            coordinates: [location.lng, location.ltd],
          },
        });
      } catch (err) {
        console.log("Location update error:", err.message);
      }
    });

    // DISCONNECT
    socket.on("disconnect", () => {
      console.log(`Client disconnected: ${socket.id}`);
    });
  });
}

// SEND MESSAGE TO SPECIFIC SOCKET
const sendMessageToSocketId = (socketId, messageObject) => {
  if (io) {
    io.to(socketId).emit(
      messageObject.event,
      messageObject.data
    );
  } else {
    console.log("Socket.io not initialized.");
  }
};

module.exports = {
  initializeSocket,
  sendMessageToSocketId,
};