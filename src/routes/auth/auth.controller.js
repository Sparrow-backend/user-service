const User = require('../../models/user/user.mongo')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const {registerAdmin, registerCustomer, registerDriver, registerStaff} = require('../../models/user/user.model')

const login = async (req, res) => {
    try {
        const {userName, password } = req.body;

        const user = await User.findOne({userName})

        if (!user) {
            return res.status(404).json({message: 'User not found'})
        }

        const isMatch = await bcrypt.compare(password, user.password)

        if (!isMatch) {
            return res.status(400).json({message: 'Invalid credentials'})
        }

        const token = jwt.sign({
            id: user._id,
            role: user.role
        }, process.env.JWT_SECRET, {expiresIn: '1h'})

        res.cookie('token', token, {
            httpOnly: true,
            secure: true, 
            sameSite: 'none',
            maxAge: 3600000
        })

        return res.status(200).json({"Message": "Login Successful", "role": user.role})
    } catch(err) {
        return res.status(404).json({message: err})
    }
}

const httpRegisterCustomer = async(req, res) => {
    try {
        await registerCustomer(req.body)
        res.status(201).json({message: "Customer created successfully"})
    } catch(err) {
        console.log("Error in creating customer", err);
        return res.status(500).json({message: err})
    }
}


const httpRegisterStaff = async(req, res) => {
    try {
        await registerStaff(req.body)
        res.status(201).json({message: "Staff created successfully"})
    } catch(err) {
        console.log("Error in creating Staff", err)
        return res.status(500).json({message: err})
    }
}

const httpRegisterDriver = async(req, res) => {
    try {
        await registerDriver(req.body)
        res.status(201).json("Driver registered successfully")

    } catch(err) {
        console.log("Error in creating Driver", err)
        return res.status(500).json({message: err})
    }
}

const httpRegisterAdmin = async (req, res) => {
    try {
        await registerAdmin(req.body)
        res.status(201).json({message:"Admin registered successfully"})
    } catch(err) {
        console.log("Error in registering admin", err)
        return res.status(500).json({message: err})
    }
}


module.exports = {
    login,
    httpRegisterAdmin,
    httpRegisterCustomer,
    httpRegisterDriver,
    httpRegisterStaff
}