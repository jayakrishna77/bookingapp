const http = require('http');
const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const cors = require('cors');

//importing local files
const authRoute = require('./routes/auth.js');
const roomsRoute = require('./routes/rooms.js');
const usersRoute = require('./routes/users.js');
const hotelsRoute = require('./routes/hotels.js');

const app = express();

const hostname = '127.0.0.1';
const port = 8080;

//connecting mongodb
const userName = "katikamjayakrishna143";
const password = "J9MyxiwvcPNAlhlA";
const cluster = "cluster0.ecc73tp";
const dbName = "bookingData";
const connectionDB = async () => {
    try {
        const db = await mongoose.connect(
            `mongodb+srv://${userName}:${password}@${cluster}.mongodb.net/${dbName}?retryWrites=true&w=majority`,
            {
                useNewUrlParser: true,
                useUnifiedTopology: true
            });
            console.log(`MongoDB connected...${db.connection.host}`)
    } catch (err) {
        throw(err)
    }
}
connectionDB();

mongoose.connection.on("disconnect", () => {
    console.log("mongoDB disconnected!");
});

mongoose.connection.on("connection", () => {
    console.log("mongoDB connected!");
});

//middlewares
app.use(express.json());
app.use(cookieParser());
app.use(cors());

app.use("/api/auth", authRoute);
app.use('/api/rooms', roomsRoute);
app.use('/api/hotels', hotelsRoute);
app.use('/api/users', usersRoute);


// error handling middlewares
app.use((err, req, res, next) => {
    const errorStatus = err.status || 500;
    const errorMessage = err.message || "Somthing went wrong!";

    res
    .status(errorStatus)
    .json({
        success:false,
        status:errorStatus,
        message:errorMessage,
        stack:err.stack
    });
    // res.send(errorMessage);
})


app.listen(port, hostname, () => {
    console.log(`Server is running at http://${hostname}:${port}`)
})