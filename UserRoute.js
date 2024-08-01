
const UserModel = require('./userdetails')

const getUsers = (req,res)=>{
    res.send("here are the users")
}

const createUser =async (req,res)=>{
    const {firstName,lastName,country,date,month,year,email,pass} = req.body;
    console.log(firstName,lastName,country,month,year,email,pass)

   try{
    const oldUser = await UserModel.findOne({email})
    if(oldUser) {
        console.log("user already exists")
        return res.status(201).json({message:"User alrady exisits"})
    }
    const User = new UserModel({
        firstName,
        lastName,
        country,
        date,
        month,
        year,
        email,
        pass
    })
    console.log("wait")
    await User.save()
    res.status(200).json(User);
   }catch(e){
    res.status(500).send(e.message)
    console.log(e)
   }
}

module.exports = {getUsers,createUser}

