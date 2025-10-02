const {getStaffById, createStaff} = require('../../models/staff/staff.model')

const httpGetStaffById = async (req, res) => {
    try {
        const staffId = req.params.id;
        const staffDetails = await getStaffById(staffId);
        if (!staffDetails) {
            return res.status(404).json({message: "Staff not found"})
        }
        return res.status(200).json(staffDetails)
    } catch(err) {
        console.error("Error in getting admin details")
        return res.status(500).json({message: "Internal Server Error"})
    }
}


module.exports = {
    httpGetStaffById
}

