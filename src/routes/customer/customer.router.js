const {httpGetCustomerById} = require('./customer.controller')

const express = require('express')

const CustomerRouter = express.Router()

CustomerRouter.get('/:id', httpGetCustomerById)

module.exports = CustomerRouter