const http = require("http");
const app = require("./src/app");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const serverless = require("serverless-http"); // helps for AWS Lambda

dotenv.config();

const PORT = process.env.PORT || 8003;
const MONGODB_URI =
  process.env.MONGO_URL || "mongodb://localhost:27017/sparrow-users";

// Create HTTP server
const server = http.createServer(app);

// MongoDB connection
mongoose.connection.once("open", () => {
  console.log("MongoDB is ready!");
});

mongoose.connection.on("error", (err) => {
  console.error("Error in connecting with MongoDB:", err);
});

async function createServer() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log("MongoDB connected successfully!");

    // Only start listening if running directly (node server.js)
    if (require.main === module) {
      server.listen(PORT, () => {
        console.log(`🚀 Server listening on port ${PORT}..`);
      });
    }
  } catch (err) {
    console.error("Failed to connect to MongoDB:", err);
    process.exit(1);
  }
}

createServer();

// ✅ Export for serverless environments
module.exports = app;            
