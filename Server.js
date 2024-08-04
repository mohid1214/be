const express = require("express");
const app = express();
app.use(express.json());
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
app.post('/users/geturlforprofileuploaad',userPicture.SendUploadUrlFE);
app.put('/users/updateprofilepictureink',userPicture.updateProfilePicturelink)

app.listen(3000, () => {
  console.log("server started om port 3000");
});




