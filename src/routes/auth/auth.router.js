const {login, httpRegisterAdmin, httpRegisterCustomer, httpRegisterDriver, httpRegisterStaff} = require('./auth.controller');

const express = require('express')

const AuthRouter = express.Router()

AuthRouter.post('/login', login)
AuthRouter.post('/register/admin', httpRegisterAdmin)
AuthRouter.post('/register/staff', httpRegisterStaff)
AuthRouter.post('/register/driver', httpRegisterDriver)
AuthRouter.post('/register/customer', httpRegisterCustomer)

module.exports = AuthRouter