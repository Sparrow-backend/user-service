const {httpGetDriverById} = require('./driver.controller')

const express = require('express')

const DriverRouter = express.Router()

DriverRouter.get('/:id', httpGetDriverById)

module.exports = DriverRouter