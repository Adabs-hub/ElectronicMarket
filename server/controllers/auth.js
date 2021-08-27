import User from '../models/user'
import { hashPassword, comparePassword } from '../utils/auth';
import jwt from 'jsonwebtoken';
import { json } from 'express';

export const register = async(req, res) => {
    //console.log(req.body);
    //res.json('you hit server endpoint in auth.js from controller');
    try {
        console.log(req.body);
        const { name, email, password } = req.body;

        if (!name) return res.status(400).send("Name is required");
        if (!password || password.length < 6) {
            return res.status(400)
                .send("Password is less than 6 characters")

        }
        let userExist = await User.findOne({ email }).exec();
        if (userExist) return res.status(400).send("Email already exit");

        //hash password
        const hashedPassword = await hashPassword(password);

        //register
        const user = new User({
            name,
            email,
            password: hashedPassword,
        });
        await user.save();
        console.log("saved user", user);
        return res.json({ ok: true });
    } catch (err) {
        console.log(err)
        return res.status(400).send("Error. Try again")
    }
};

export const login = async(req, res) => {
    console.log(req.body);
    try {

        const { email, password } = req.body;
        //chech if user exist in database
        const user = await User.findOne({ email }).exec();

        if (!user) return res.status(400).send("wrong user name")
            //check password

        console.log("compared password:::", password, "  ", user.password);

        const match = await comparePassword(password, user.password);
        if (!match) return res.status(400).send("invalid password");
        //create signed jwt

        const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, { expiresIn: "7d", })


        //return user and token to client, exclude hashed password
        user.password = undefined;
        //0send token in cockie
        res.cookie("token", token, {
            httpOnly: true,
            //secure:true //only work on https

        });
        //send user as json respond
        res.json(user);
    } catch (err) {
        console.log(err)
        return res.status(400).send("Error, Try again");

    }
}
export const logout = async(req, res) => {

    try {
        res.clearCookie('token');
        return res.json({ message: 'sign out success' });

    } catch (err) {
        console.log(err)
        return res.status(400).send("Error, Try again");
    }
}

export const currentUser= async (req, res)=>{
    try {
        const user = await User.findById(req.user._id).select("-password").exec();
       //console.log("CURRENT USER", user);
       return res.json({found:true});
    }catch(err)
        {
            console.log(err)
        }
}