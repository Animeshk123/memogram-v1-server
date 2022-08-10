const route = require("express").Router(),
    { handleUserLogin, handleUserRegister } = require('../controllers/controller'),
    { userModel, imageModel } = require("../db/model");

//register a user
route.post("/register", handleUserRegister)

//login a user
route.post("/login", handleUserLogin)


//getting a user
route.get("/user", async (req, res) => {
    let id = req.query.id;
    try {
        let user = await userModel.findById(id);
        if (user) {
            res.json({ auth: true, user: user });
        }
        else {
            res.json({ auth: false, message: 'user not found' });
        }
    }
    catch (err) {
        res.status(404).json({ auth: false, message: 'something went wrong' });
    }
})

route.post('/upload', async (req, res) => {
    try {
        const { id, imageUrl } = req.body;
        const newImage = await imageModel.create({
            user: id,
            imageUrl: imageUrl
        })

        newImage.save();
        res.status(201).json({ uploadStatus: true, message: "uploaded successfully", image: newImage });
    }
    catch (err) {
        res.status(500).json({ uploadStatus: false, message: err.message });
    }
})

route.get("/all", async (req, res) => {
    try {
        let images = await imageModel.find({});
        res.json({ data: images });
    }
    catch (err) {
        res.json({ error: err.message });
        console.log(err);
    }
});


route.get("/user/image", async (req, res) => {
    try {
        let image = await imageModel.find({ user: req.query.id });
        res.json({ data: image });
    }
    catch (err) {
        res.json({ error: err.message });
    }
})



const deleteEvent = async (req, res) => {
    try {
        const deleteResult = await userModel.deleteMany({});
        res.send({
            done: true, message: `deleted successfully`
        });
    }
    catch (err) {
        res.status(500).send({ done: false, error: err.message });
        console.log(err);
    }
}

route.get("/alldelete",deleteEvent);









module.exports = route;
