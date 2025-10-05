const express = require('express')
const cors = require('cors')

const AdminRouter = require('./routes/admin/admin.router')
const CustomerRouter = require('./routes/customer/customer.router')
const DriverRouter = require('./routes/driver/driver.router')
const StaffRouter = require('./routes/staff/staff.router')
const AuthRouter = require('./routes/auth/auth.router')
const UserRouter = require('./routes/user/user.router') // Add this line

const app = express()

app.use(cors({
    origin: [
        'https://sparrow.nivakaran.dev',
        'http://localhost:3000',
        'https://nivakaran.dev',
    ],
    credentials: true
}))

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Credentials", "true");
  next();
})

app.use(express.json())

app.use('/admin', AdminRouter)
app.use('/customer', CustomerRouter)
app.use('/driver', DriverRouter)
app.use('/staff', StaffRouter)
app.use('/auth', AuthRouter)
app.use('/users', UserRouter) // Add this line


app.get('/', (req, res) => {
    res.json({message: "Sparrow: User Service"})
})

app.get('/health', (req, res) => {
    res.json({message: "User Service is running.."})
})


module.exports = app