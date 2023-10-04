const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require("../models/AuthModel.js");
const createError = require('../utils/error.js');

const register = async (req, res, next) => {
    const salt = bcrypt.genSaltSync(10);
    const hashPassword = bcrypt.hashSync(req.body.password, salt);
    try {
        const newUser = new User({
            name: req.body.name,
            password: hashPassword,
            email: req.body.email,
        });
        await newUser.save();
        res.status(200).send("user has been created");
    } catch (err) {
        next(err);
    }
}

const login = async (req, res, next) => {

    try {
        const findUser = await User.findOne({ email: req.body.email });
        if (!findUser) {
            return next(createError(404, "user not found!"))
        }
        const isPasswordCorrect = await bcrypt.compare(req.body.password, findUser.password);
        if (!isPasswordCorrect) return next(createError(400, "Wrong password or user email"));
        const token = jwt.sign({ id: findUser._id, isAdmin: findUser.isAdmin }, "shshshs")
        const { password, isAdmin, ...otherDetails } = findUser._doc
        res
        .cookie("access_token", token, { httpOnly: true })
        .status(200)
        .send({ ...otherDetails });
    } catch (err) {
        next(err);
    }
}

module.exports = { register, login }