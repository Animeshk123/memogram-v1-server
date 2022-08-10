require('dotenv').config();
const express = require("express"),
    app = express(),
    PORT = 4500 || process.env.PORT,
    route = require("./routes/route"),
    connectToDb = require("./db/db"),
    MONGO_URL = process.env.MONGO_URL;
const cors = require("cors");


app.use(cors({
    origin: "*",
}))
app.use(express.json());
app.use('/api/v1', route);




connectToDb(MONGO_URL, () => {
    app.listen(PORT, () => {
        console.log(`server is running on http://localhost:${PORT}`);
    })
})
