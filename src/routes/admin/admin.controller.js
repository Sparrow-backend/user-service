const {getAdminById, createAdmin} = require('../../models/admin/admin.model')

const httpGetAdminById = async (req, res) => {
    try {
        const adminId = req.params.id;
        const adminDetails = await getAdminById(adminId);
        if (!adminDetails) {
            return res.status(404).json({message: "Admin not found"})
        }
        return res.status(200).json(adminDetails)
    } catch(err) {
        console.error("Error in getting admin details")
        return res.status(500).json({message: "Internal Server Error"})
    }
}


module.exports = {
    httpGetAdminById
}

