import { Server } from "socket.io";
import userModel from "./model/User.model.js";
import captainModel from "./model/Captain.model.js";

let io; // Declare io at a higher scope to use it across the module

function initializeSocket(server) {
  io = new Server(server, {
    cors: {
      origin: "*", // Replace with your client-side origin
    },
  });

  io.on("connection", (socket) => {
    console.log("A user connected:", socket.id);

    socket.on("join", async (data) => {
      const { userId, userType } = data;
      if (userType === "user") {
        console.log("User is connected:", socket.id);
        await userModel.findByIdAndUpdate(userId, { socketId: socket.id });
      } else if (userType === "captain") {
        console.log("Captain is connected:", socket.id);
        await captainModel.findByIdAndUpdate(userId, { socketId: socket.id });
      }
    });

    socket.on("update-captain-location", async (data) => {
      try {
        const { userId, location } = data;

        if (!userId || !location || !location.latitude || !location.longitude) {
          console.error("Invalid location data provided.");
          return socket.emit("error", { message: "Invalid location data." });
        }

        const updatedCaptain = await captainModel.findByIdAndUpdate(
          userId,
          {
            location: {
              type: "Point",
              coordinates: [location.longitude, location.latitude],
            },
          },
          { new: true }
        );

        if (!updatedCaptain) {
          console.error("Captain not found for userId:", userId);
          return socket.emit("error", { message: "Captain not found." });
        }

        console.log(
          `Location updated for Captain ${userId}:`,
          updatedCaptain.location
        );

        socket.emit("location-updated", {
          message: "Location updated successfully.",
          location: updatedCaptain.location,
        });
      } catch (error) {
        console.error("Error updating captain location:", error.message);
        socket.emit("error", { message: "Could not update location." });
      }
    });

    socket.on("disconnect", () => {
      console.log("A user disconnected:", socket.id);
    });
  });
}

function sendMessageToSocketId(socketId, messageObject) {
  if (io) {
    io.to(socketId).emit(messageObject?.event, messageObject?.data); // Emit the "new-ride" event
  } else {
    console.log("Socket is not initialized");
  }
}

export { initializeSocket, sendMessageToSocketId };
