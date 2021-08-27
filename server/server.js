import express from 'express';
import { readdirSync } from 'fs';
import cors from 'cors';
import mongoose from 'mongoose';
import csrf from 'csurf';
import cookieParser from "cookie-parser";
const morgan = require("morgan");
require("dotenv").config();

const csrfProtection = csrf({cookie:true});

//create express app
const app = express();

//db
mongoose.connect(process.env.DATABASE, {

        useFindAndModify: false,
        useUnifiedTopology: true,
        useCreateIndex: true,
    }).then(() => console.log('DB connected'))
    .catch((err) => console.log("DB connection failed", err));

//apply middlewares
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));
app.use(cookieParser());

app.use((rep, res, next) => {
    console.log("this middleware use off my own")
    next();
});


//route
readdirSync('./routes').map((r) => app.use('/api', require(`./routes/${r}`)));
//csrf
app.use(csrfProtection);
app.get("/api/csrf-token", (req, res)=>{
    res.json({csrfToken:req.csrfToken()})
})
//port
const port = process.env.PORT || 8000;

app.listen(port, () => console.log(`Adabs Server is running on port ${port}`));