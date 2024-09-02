const { S3Client, GetObjectCommand, PutObjectCommand } = require('@aws-sdk/client-s3')
const { getSignedUrl } = require('@aws-sdk/s3-request-presigner')
const UserModel = require('./userdetails')



const newS3Client = new S3Client({
    region: "eu-north-1",
    credentials: {
        accessKeyId: 'AKIAQEFWAZSS3VUGMPLP',
        secretAccessKey: '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'
    }
})

const SendUploadUrlFE = async (req, res) => {
    console.log("called")
    console.log(req.body)
    const { fileName, fileType } = req.body;
    const result = await getUrlForUpload(fileName, fileType)
    console.log(result)
    res.send(result);

}

const getUrlForUpload = async (fileName, fileType) => {
    const command = new PutObjectCommand({
        Bucket: 'sumyalsnewbucket',
        Key: `uploads/user-uploads/${fileName}`,
        ContentType: fileType
    })

    const url = await getSignedUrl(newS3Client, command);
    return url
}


const giveProfilePicture = async (req, res) => {
    const { email } = req.query;
    console.log(email)
    const oldUser = await UserModel.findOne({ email });
    if (!oldUser) {
        return res.status(201).json({ message: "Not Possible" });
    }

    res.send(oldUser.profilePicture)
}


const getUrlForDownload = async (Key) =>{
    const command = new GetObjectCommand({
        Bucket:'sumyalsnewbucket',
        Key: `uploads/user-uploads/${Key}`,
    })
    const url = await getSignedUrl(newS3Client,command)
    return url;
}
const updateProfilePicturelink = async (req, res) => {
    console.log("called")
    const {email,name} = req.body;
    console.log(email,name);
    const downloadUrl = await getUrlForDownload(name)
    console.log(downloadUrl)
    const oldUser = await UserModel.findOne({email})
    if(oldUser && downloadUrl){
        console.log("download url")
        oldUser.profilePicture = downloadUrl;
        await oldUser.save();
        res.send(downloadUrl)
    }
}


module.exports = { giveProfilePicture, SendUploadUrlFE,updateProfilePicturelink }

