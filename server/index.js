const express = require('express');
const dotenv = require('dotenv');
const mongoose = require("mongoose");
const cors = require("cors");

const userRouter = require('./routes/user.routes.js');
const requestRouter = require('./routes/request.routes.js');
const notificationRouter = require('./routes/notification.routes.js');

dotenv.config();

const app = express();
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(cors());

app.use("/api/users", userRouter);
app.use("/api/requests", requestRouter);
app.use("/api/notifications", notificationRouter);

const connectDB = (url) => {
    mongoose.set("strictQuery", true);

    mongoose
        .connect(url)
        .then(() => console.log("MongoDB connected"))
        .catch((error) => console.log(error));
};

const startServer = async () => {
    try {
        connectDB(process.env.MONGODB_URL);

        app.listen(8080, () => {
            console.log("Server started on port http://localhost:8080");
        });
    } catch (error) {
        console.log(error);
    }
};

app.get("/", (req, res) => {
    console.log("server is running")
});

startServer();
// server.listen(5000, () => {
//     console.log("pls work")
// })