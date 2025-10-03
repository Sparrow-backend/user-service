const mongoose = require("mongoose");
const dotenv = require("dotenv");
const serverless = require("serverless-http");
const app = require("./src/app");

dotenv.config();

const MONGODB_URI =
  process.env.MONGO_URL || "mongodb://localhost:27017/sparrow-users";

// --- Cache connection (important for serverless) ---
let isConnected = false;

async function connectDB() {
  if (isConnected) return;
  try {
    const db = await mongoose.connect(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    isConnected = db.connections[0].readyState === 1;
    console.log("✅ MongoDB connected");
  } catch (err) {
    console.error("❌ MongoDB connection error:", err.message);
    throw err;
  }
}

// --- Wrap app with serverless ---
const handler = serverless(async (req, res) => {
  await connectDB(); // ensure DB connected before each request
  return app(req, res);
});

// Export for Vercel
module.exports = handler;
