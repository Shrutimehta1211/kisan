const express = require("express")
let cookieParser = require("cookie-parser");
let logger = require("morgan");
const cors = require("cors");

require('./db/mongoose.js')
const userRouter = require('./routers/user')

const app = express()

app.use(logger("dev"));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(userRouter)

module.exports = app