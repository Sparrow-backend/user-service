const User = require('../../models/user/user.mongo');
const Admin = require('../../models/admin/admin.mongo');
const Customer = require('../../models/customer/customer.mongo');
const Driver = require('../../models/driver/driver.mongo');
const Staff = require('../../models/staff/staff.mongo');

const httpGetAllUsers = async (req, res) => {
    try {
        const { role, search, limit, skip } = req.query;
        
        let query = {};
        if (role && role !== 'all') {
            query.role = role;
        }
        
        const users = await User.find(query)
            .limit(limit ? parseInt(limit) : 100)
            .skip(skip ? parseInt(skip) : 0)
            .sort({ createdTimestamp: -1 });
        
        // Populate user details based on role
        const usersWithDetails = await Promise.all(users.map(async (user) => {
            let details = null;
            try {
                switch(user.role) {
                    case 'Admin':
                        details = await Admin.findById(user.entityId);
                        break;
                    case 'Customer':
                        details = await Customer.findById(user.entityId);
                        break;
                    case 'Driver':
                        details = await Driver.findById(user.entityId);
                        break;
                    case 'Staff':
                        details = await Staff.findById(user.entityId);
                        break;
                }
            } catch (err) {
                console.error(`Error fetching details for user ${user._id}:`, err);
            }
            
            return {
                _id: user._id,
                userName: user.userName,
                role: user.role,
                entityId: user.entityId,
                createdTimestamp: user.createdTimestamp,
                details: details ? {
                    firstName: details.firstName,
                    lastName: details.lastName,
                    email: details.email,
                    phoneNumber: details.phoneNumber,
                    gender: details.gender
                } : null
            };
        }));
        
        const total = await User.countDocuments(query);
        
        return res.status(200).json({
            success: true,
            count: usersWithDetails.length,
            total: total,
            data: usersWithDetails
        });
    } catch (error) {
        console.error("Error fetching all users:", error);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
};

const httpGetUserStats = async (req, res) => {
    try {
        const totalUsers = await User.countDocuments();
        const adminCount = await User.countDocuments({ role: 'Admin' });
        const staffCount = await User.countDocuments({ role: 'Staff' });
        const customerCount = await User.countDocuments({ role: 'Customer' });
        const driverCount = await User.countDocuments({ role: 'Driver' });
        
        return res.status(200).json({
            success: true,
            data: {
                total: totalUsers,
                admin: adminCount,
                staff: staffCount,
                customer: customerCount,
                driver: driverCount
            }
        });
    } catch (error) {
        console.error("Error fetching user stats:", error);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
};

module.exports = {
    httpGetAllUsers,
    httpGetUserStats
};