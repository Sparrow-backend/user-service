const {httpGetStaffById} = require('./staff.controller')

const express = require('express')

const StaffRouter = express.Router()

StaffRouter.get('/:id', httpGetStaffById)

module.exports = StaffRouter