const {getDriverById, createDriver} = require('../../models/driver/driver.model')

const httpGetDriverById = async (req, res) => {
    try {
        const driverId = req.params.id;
        const driverDetails = await getDriverById(driverId);
        if (!driverDetails) {
            return res.status(404).json({message: "Driver not found"})
        }
        return res.status(200).json(driverDetails)
    } catch(err) {
        console.error("Error in getting admin details")
        return res.status(500).json({message: "Internal Server Error"})
    }
}


module.exports = {
    httpGetDriverById
}

