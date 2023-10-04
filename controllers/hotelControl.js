const Hotel = require("../models/HotelModel.js");

const createHotel = async (req, res, next) => {
    const newHotel = new Hotel(req.body)
    try {
        const savedHotel = await newHotel.save();
        res.status(200).json(savedHotel)
    } catch (err) {
        next(err);
    }
}

const getHotel = async (req, res, next) => {
    try {
        const findHotel = await Hotel.findById(req.params.id)
        res.status(200).json(findHotel)
    } catch (err) {
        next(err);
    }
}

const updateHotel = async (req, res, next) => {
    try {
        const updated = await Hotel.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true });
        //   const data = await Hotel.findByIdAndUpdate(req.params.id, req.body, { new : true });
        res.status(200).json(updated)
    } catch (err) {
        next(err);
    }
}

const deleteHotel = async (req, res, next) => {
    try {
        await Hotel.findByIdAndDelete(req.params.id)
        res.status(200).json("hotel has been deleted")
    } catch (err) {
        next(err);
    }
}

const getHotels = async (req, res, next) => {
    try {
        const hotels = await Hotel.find();
        res.status(200).json(hotels)
    } catch (err) {
        next(err);
    }
}

module.exports = { createHotel, getHotel, getHotels, deleteHotel, updateHotel }