const {login} = require('./auth.controller');

const express = require('express')

const AuthRouter = express.Router()

AuthRouter.post('/login', login)

module.exports = AuthRouter