
const UserModel = require('./userdetails')



const createUser = async (req, res) => {
    const { firstName, lastName, country, date, month, year, email, pass } = req.body;

    try {
        const oldUser = await UserModel.findOne({ email })
        if (oldUser) {
            console.log("user already exists")
            return res.status(201).json({ message: "User alrady exisits" })
        }
        const User = new UserModel({
            firstName,
            lastName,
            country,
            date,
            month,
            year,
            email,
            pass,
            profilePicture: 'https://sumyalspublicbucket.s3.eu-north-1.amazonaws.com/ProfilePicDefault.jpg',
        })
        console.log("wait")
        await User.save()
        res.status(200).json(User);
    } catch (e) {
        res.status(500).send(e.message)
        console.log(e)
    }
}

const ValidateLogin = async (req, res) => {
    const { email, pass } = req.query;
    try {
        console.log("trying");
        const oldUser = await UserModel.findOne({ email });
        if (!oldUser) {
            return res.status(201).json({ message: "User does not exist" })
        }
        console.log(oldUser)
        if (pass === oldUser.pass) {
            res.status(200).json({ message: "User found,credentials are correct" })
        } else {
            res.status(201).json({ message: "Wrong credentials" })
        }


    } catch (e) {
        console.log("error");
    }

}

module.exports = { createUser, ValidateLogin }

