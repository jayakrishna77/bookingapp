const User = require("../models/AuthModel");

const getUser = async (req, res, next) => {
    try {
        const findUser = await User.findById(req.params.id)
        res.status(200).json(findUser)
    } catch (err) {
        next(err);
    }
}

const updateUser = async (req, res, next) => {
    try {
        const updated = await User.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true });
        //   const data = await User.findByIdAndUpdate(req.params.id, req.body, { new : true });
        res.status(200).json(updated)
    } catch (err) {
        next(err);
    }
}

const deleteUser = async (req, res, next) => {
    try {
        await User.findByIdAndDelete(req.params.id)
        res.status(200).json("User has been deleted")
    } catch (err) {
        next(err);
    }
}

const getUsers = async (req, res, next) => {
    try {
        const users = await User.find();
        res.status(200).json(users)
    } catch (err) {
        next(err);
    }
}

module.exports = { getUser, getUsers, deleteUser, updateUser }