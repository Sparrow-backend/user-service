const http = require('http')
const app = require('./src/app')
const mongoose = require('mongoose')
const dotenv = require('dotenv')

dotenv.config()

const PORT = process.env.PORT || 8003
const MONGODB_URI = process.env.MONGO_URL || 'mongodb://localhost:27017/sparrow-users'

mongoose.connection.once('open', () => {
    console.log("MongoDB is ready!")
})

mongoose.connection.on('error', (err) => {
    console.error('Error in connecting with MongoDB:', err)
})

const server = http.createServer(app)

async function createServer() {
    try {
        // CRITICAL: Connect to MongoDB before starting server
        await mongoose.connect(MONGODB_URI)
        console.log('MongoDB connected successfully!')
        
        server.listen(PORT, () => {
            console.log(`Server listening on port ${PORT}..`)
        })
    } catch(err) {
        console.error('Failed to connect to MongoDB:', err)
        process.exit(1)
    }
}

createServer()