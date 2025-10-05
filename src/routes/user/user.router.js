const express = require('express');
const { httpGetAllUsers, httpGetUserStats } = require('./user.controller');

const UserRouter = express.Router();

// Get all users (for admin)
UserRouter.get('/', httpGetAllUsers);

// Get user statistics
UserRouter.get('/stats', httpGetUserStats);

module.exports = UserRouter;