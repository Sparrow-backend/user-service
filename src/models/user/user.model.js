const User = require('./user.mongo')
const bcrypt = require('bcryptjs')
const {createAdmin} = require('../admin/admin.model')
const {createCustomer} = require('../customer/customer.model')
const {createDriver} = require('../driver/driver.model')
const {createStaff} = require('../staff/staff.model')

const registerAdmin = async (data) => {
    const hashedPassword = await bcrypt.hash(data.password, 10);

    const adminId = await createAdmin({
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        phoneNumber: data.phoneNumber,
        gender: data.gender
    })

    const user = new User({
        userName: data.userName,
        password: hashedPassword,
        entityId: adminId,
        role: "Admin"
    })

    await user.save();
    return "User created successfully"
}

const registerCustomer = async (data) => {
    const hashedPassword = await bcrypt.hash(data.password, 10);

    const customerId = await createCustomer({
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        phoneNumber: data.phoneNumber,
        gender: data.gender
    })

    const user = new User({
        userName: data.userName,
        password: hashedPassword,
        entityId: customerId,
        role: "Customer"
    })

    await user.save();
    return "User created successfully"
}

const registerStaff = async (data) => {
    const hashedPassword = await bcrypt.hash(data.password, 10);

    const staffId = await createStaff({
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        phoneNumber: data.phoneNumber,
        gender: data.gender
    })

    const user = new User({
        userName: data.userName,
        password: hashedPassword,
        entityId: staffId,
        role: "Staff"
    })

    await user.save();
    return "User created successfully"
}

const registerDriver = async (data) => {
    const hashedPassword = await bcrypt.hash(data.password, 10);

    const driverId = await createDriver({
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        phoneNumber: data.phoneNumber,
        gender: data.gender
    })

    const user = new User({
        userName: data.userName,
        password: hashedPassword,
        entityId: driverId,
        role: "Driver"
    })

    await user.save();
    return "User created successfully"
}

module.exports = {
    registerAdmin,
    registerCustomer,
    registerDriver,
    registerStaff
}