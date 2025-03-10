import { Server, Socket } from "socket.io";
import jwt from "jsonwebtoken";
import { TokenModel } from "../db/models/token";
import cron from "node-cron";

let io: any = null;

function connectSockets(server: any) {
  io = new Server(server, {
    cors: {
      origin: "*",
    },
  });

  io.on("connection", (socket: Socket) => {
    socket.on("verify-token", async (token: any) => {
      if (token) {
        jwt.verify(token, process.env.JWT_SECRET ?? "", async (err: any) => {
          if (err) {
            console.log("token not authenticated");
            return;
          }
          const tokenData = await TokenModel.findOne({ token });

          if (tokenData) {
            tokenData.favorite = await tokenData.populate({
              path: "favorite",
              options: { lean: true },
            });
          }
          socket.emit("get-token-info", tokenData);
        });
      } else {
        const newTokenStr = jwt.sign(
          { id: socket.id },
          process.env.JWT_SECRET ?? ""
        );
        const newToken = new TokenModel({
          token: newTokenStr,
          cart: {},
          favorite: {},
          compare: [] as string[],
        });
        await newToken.save();
        socket.emit("new-token", newTokenStr);
        socket.emit("get-token-info", newToken);
      }
    });

    socket.on("change-token", async (token: any, cart, favorite, compare) => {
      try {
        await TokenModel.findOneAndUpdate(
          { token },
          { cart, favorite, compare },
          { new: true, runValidators: true }
        );
      } catch (error) {
        console.error("Error updating token:", error);
      }
    });

    socket.on("disconnect", () => {
      console.log("user disconnected ", socket.id);
    });
  });
}

const deleteOldCookies = async () => {
  try {
    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

    const result = await TokenModel.deleteMany({
      createdAt: { $lt: oneWeekAgo },
    });
    console.log(`Deleted ${result.deletedCount} old cookies.`);
  } catch (error) {
    console.error("Error deleting old cookies:", error);
  }
};

// Schedule the cleanup to run **every night at midnight (server time)**
cron.schedule("0 0 * * *", async () => {
  console.log("Running scheduled cookie cleanup...");
  await deleteOldCookies();
});

export { connectSockets, io };
