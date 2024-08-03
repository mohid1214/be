const { s3client, GetObjectCommand, PutObjectCommand } = require('@aws-sdk/client-s3')
const { getSignedUrl } = require('@aws-sdk/s3-request-presigner')
const UserModel = require('./userdetails')




const giveProfilePicture = async (req, res) => {
    console.log("called");
    const { email } = req.query;
    console.log(email)
    const oldUser = await UserModel.findOne({ email });
    if (!oldUser) {
        return res.status(201).json({ message: "Not Possible" });
    }

    res.send(oldUser.profilePicture)
    console.log(oldUser.profilePicture)
    console.log("sending proile pic url")
}


module.exports = { giveProfilePicture }

