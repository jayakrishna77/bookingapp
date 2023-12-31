const Room = require('../models/RoomModel.js');
const Hotel = require('../models/HotelModel.js');

const createRoom = async (req, res, next) => {
    const hotelId = req.params.hotelid;
    const newRoom = new Room(req.body);
    try {
        const savedRoom = await newRoom.save()
        try {
            await Hotel.findByIdAndUpdate(hotelId, {
                $push: { rooms: savedRoom._id }
            })
        } catch (err) {
            next(err)
        }
        res.status(200).json(savedRoom)
    } catch (err) {
        next(err)
    }
}

const getRoom = async (req, res, next) => {
    try {
        const findRoom = await Room.findById(req.params.id)
        res.status(200).json(findRoom)
    } catch (err) {
        next(err);
    }
}

const updateRoom = async (req, res, next) => {
    try {
        const updated = await Room.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true });
        //   const data = await Room.findByIdAndUpdate(req.params.id, req.body, { new : true });
        res.status(200).json(updated)
    } catch (err) {
        next(err);
    }
}

const deleteRoom = async (req, res, next) => {
    const hotelId = req.params.hotelid;
    try {
        await Room.findByIdAndDelete(req.params.id);
        try {
            await Hotel.findByIdAndUpdate(hotelId, { $pull: { rooms: req.params.id } });
        } catch (err) {
            next(err);
        }
        res.status(200).json("Room has been deleted")
    } catch (err) {
        next(err);
    }
}

const getRooms = async (req, res, next) => {
    try {
        const rooms = await Room.find();
        res.status(200).json(rooms)
    } catch (err) {
        next(err);
    }
}

module.exports = { createRoom, getRoom, updateRoom, deleteRoom, getRooms }