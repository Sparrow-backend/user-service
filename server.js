const mongoose = require("mongoose");
const dotenv = require("dotenv");
const serverless = require("serverless-http");
const http = require("http");
const app = require("./src/app");

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost:27017/sparrow-users";
const PORT = process.env.PORT || 8002;

let isConnected = null;

// Reusable MongoDB connection (for serverless)
async function connectToDatabase() {
  if (isConnected) return;
  try {
    const db = await mongoose.connect(MONGODB_URI, { bufferCommands: false });
    isConnected = db.connections[0].readyState;
    console.log("✅ MongoDB connected");
  } catch (err) {
    console.error("❌ MongoDB connection error:", err);
    throw err;
  }
}

// Vercel handler (serverless)
const handler = async (req, res) => {
  await connectToDatabase();
  return app(req, res);
};

// Local development (only runs if not in Vercel)
if (!process.env.VERCEL) {
  connectToDatabase().then(() => {
    http.createServer(app).listen(PORT, () => {
      console.log(`🚀 Server running locally on http://localhost:${PORT}`);
    });
  }).catch((err) => {
    console.error("❌ Failed to start local server:", err);
    process.exit(1);
  });
}

// Export for Vercel
module.exports = serverless(handler);
