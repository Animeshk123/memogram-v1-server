const {userModel} = require('../db/model'),
    { hashPassword, matchPassword } = require("../middalware/middalware");

const handleUserRegister = async (req, res) => {
    try {
        const { name, email, password, profileUrl } = req.body;
        const newUser = await userModel.create({
            userName: name,
            userEmail: email,
            userPassword: hashPassword(password),
            userProfile: profileUrl
        })

        newUser.save();
        res.status(201).json({ regStatus: true, message: "User Registered successfully", user: newUser });

    }
    catch (err) {
        res.status(500).json({ regStatus: false, message: (err.keyPattern) ? "User Email Already in user" : err.message });
    }

}



const handleUserLogin = async (req, res) => {
    try {
        const { email, password } = req.body;
        userModel.find({ userEmail: email }, (err, docs) => {
            if (err) return;
            if (!docs.length > 0) {
                res.status(404).json({ loginStatus: false, message: "user not Found" });
            }
            else {
                if (matchPassword(password, docs[0].userPassword)) {
                    res.json({ loginStatus: true, message: "login succcesfully", user: docs[0] });
                }
                else {
                    res.status(404).json({ loginStatus: false, message: "wrong email and password combination" });
                }

            }

        })
    }
    catch (err) {
        res.status(500).json({ loginStatus: false, message: err.message });
    }
}


module.exports = { handleUserLogin, handleUserRegister };