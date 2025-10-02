const User = require('../../models/user/user.mongo')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')


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

module.exports = {
    login
}