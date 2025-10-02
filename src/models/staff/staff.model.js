const User = require('../user/user.mongo')
const Staff = require('./staff.mongo')

const createStaff = async (data) => {
    const staff = await Staff.create({
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        phoneNumber: data.phoneNumber,
        gender: data.gender
    })

    return staff._id;
}

const getStaffById = async(id) => {
    const cleanId = id.replace(/^:/, '').trim();
    const user = await User.findById(cleanId);

    if (!user) {
        console.error("User not found")
        return null;
    }

    const staff = await Staff.findById(user.entityId)
    return [staff, user]
}

module.exports = {
    createStaff,
    getStaffById
}