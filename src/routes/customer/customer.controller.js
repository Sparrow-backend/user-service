const {getCustomerById, createCustomer} = require('../../models/customer/customer.model')

const httpGetCustomerById = async (req, res) => {
    try {
        const customerId = req.params.id;
        const customerDetails = await getCustomerById(customerId);
        if (!customerDetails) {
            return res.status(404).json({message: "Customer not found"})
        }
        return res.status(200).json(customerDetails)
    } catch(err) {
        console.error("Error in getting admin details")
        return res.status(500).json({message: "Internal Server Error"})
    }
}


module.exports = {
    httpGetCustomerById
}

