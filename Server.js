const express = require("express");
const app = express();
app.use(express.json());
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");
const userRoutes = require('./UserRoute');
const userPicture = require('./UserImages')
const { default: mongoose } = require("mongoose");

mongoose.connect('mongodb://localhost:27017/mydatabase')
.then(()=>{
  console.log("connected to mongo db")
})
.catch((e)=>{
  console.log(e + "error connection to mongo db")
})

app.post('/users/createUsers',userRoutes.createUser);
app.get('/users/login',userRoutes.ValidateLogin);
app.get('/users/profilepicture',userPicture.giveProfilePicture);

app.listen(3000, () => {
  console.log("server started om port 3000");
});




// const s3client = new S3Client({
//   region: "eu-north-1",
//   credentials: {
//     accessKeyId: "AKIAQEFWAZSSZDMJMH5O",
//     secretAccessKey: "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",
//   },
// });

// const {
//   S3Client,
//   GetObjectCommand,
//   PutObjectCommand,
// } = require("@aws-sdk/client-s3");

// async function getobjectURL(key) {
//   const command = new GetObjectCommand({
//     Bucket: "sumyalsnewbucket",
//     Key: key,
//   });
//   const url = await getSignedUrl(s3client, command);
//   return url;
// }

// async function putObject(filename, filetype) {
//   const command = new PutObjectCommand({
//     Bucket: "sumyalsnewbucket",
//     Key: `uploads/user-uploads/${filename}`,
//     ContentType: filetype,
//   });

//   const url = await getSignedUrl(s3client, command);
//   return url;
// }

// app.get("/geturl", async (req, res) => {
//   const { filename, filetype } = req.query;
//   const url = await putObject(filename, filetype);
//   const s3Url = await getobjectURL(`uploads/user-uploads/${filename}`);
//   res.send({ url, s3Url });
// });