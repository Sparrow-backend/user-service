const User = require('../user/user.mongo')
const Driver = require('./driver.mongo')

const createDriver = async (data) => {
    const driver = await Driver.create({
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        phoneNumber: data.phoneNumber,
        gender: data.gender
    })

    return driver._id;
}

const getDriverById = async(id) => {
    const cleanId = id.replace(/^:/, '').trim();
    const user = await User.findById(cleanId);

    if (!user) {
        console.error("User not found")
        return null;
    }

    const driver = await Driver.findById(user.entityId)
    return [driver, user]
}

module.exports = {
    createDriver,
    getDriverById
}