const mongoose = require("mongoose");
const dotenv = require("dotenv");
const serverless = require("serverless-http");
const app = require("./src/app");

dotenv.config();

const MONGODB_URI =
  process.env.MONGO_URL || "mongodb://localhost:27017/sparrow-users";

let isConnected;

async function connectToDatabase() {
  if (isConnected) return;
  try {
    const db = await mongoose.connect(MONGODB_URI, {
      bufferCommands: false,
    });
    isConnected = db.connections[0].readyState;
    console.log("✅ MongoDB connected");
  } catch (err) {
    console.error("❌ MongoDB connection error:", err);
    throw err;
  }
}

const handler = async (req, res) => {
  await connectToDatabase();
  return app(req, res); // Express will take over
};

module.exports = serverless(handler);
