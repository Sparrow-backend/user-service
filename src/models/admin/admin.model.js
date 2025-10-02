const User = require('../user/user.mongo')
const Admin = require('./admin.mongo')

const createAdmin = async (data) => {
    const admin = await Admin.create({
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        phoneNumber: data.phoneNumber,
        gender: data.gender
    })

    return admin._id;
}

const getAdminById = async(id) => {
    const cleanId = id.replace(/^:/, '').trim();
    const user = await User.findById(cleanId);

    if (!user) {
        console.error("User not found")
        return null;
    }

    const admin = await Admin.findById(user.entityId)
    return [admin, user]
}

module.exports = {
    createAdmin,
    getAdminById
}