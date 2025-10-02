const User = require('../user/user.mongo')
const Customer = require('./customer.mongo')

const createCustomer = async (data) => {
    const customer = await Customer.create({
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        phoneNumber: data.phoneNumber,
        gender: data.gender
    })

    return customer._id;
}

const getCustomerById = async(id) => {
    const cleanId = id.replace(/^:/, '').trim();
    const user = await User.findById(cleanId);

    if (!user) {
        console.error("User not found")
        return null;
    }

    const customer = await Customer.findById(user.entityId)
    return [customer, user]
}

module.exports = {
    createCustomer,
    getCustomerById
}