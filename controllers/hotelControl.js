const Hotel = require("../models/HotelModel");

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
    const { min, max, limit, ...others } = req.query
    try {
        const hotels = await Hotel.find({
            ...others,
            cheapestPrice: { $gt: min || 1, $lt: max || 999 }
        }).limit(limit);
        res.status(200).json(hotels)
    } catch (err) {
        next(err);
    }
    9014440436
}

const countByCity = async (req, res, next) => {
    const cities = req.query.cities.split(",");
    try {
        const list = await Promise.all(cities.map(city => {
            // return Hotel.find({city:city}).length
            return Hotel.countDocuments({ city: city })
        }))
        res.status(200).json(list)
    } catch (err) {
        next(err);
    }
}

// const countByType = async (req, res, next) => {
//     const hotelTypes = req.query.types.split(",");
//     try {
//         const list = hotelTypes.map(type => {
//             // return Hotel.find({city:city}).length
//             const val = async () => {
//                 var num = await Hotel.countDocuments({ type: type })
//                 return num
//             }
//             const v = val()
//             return { type: type, count: v }
//         })
//         res.status(200).json(list)
//     } catch (err) {
//         next(err);
//     }
// }

const countByType = async (req, res, next) => {
    try {
        const hotelCount = await Hotel.countDocuments({ type: "hotel" })
        const apartmentCount = await Hotel.countDocuments({ type: "apartment" })
        const resortCount = await Hotel.countDocuments({ type: "resort" })
        const villaCount = await Hotel.countDocuments({ type: "villa" })
        const cabinCount = await Hotel.countDocuments({ type: "cabin" })
        res.status(200).json([
            { type: "hotel", count: hotelCount },
            { type: "apartment", count: apartmentCount },
            { type: "resort", count: resortCount },
            { type: "villa", count: villaCount },
            { type: "cabin", count: cabinCount },
        ])
    } catch (err) {
        next(err)
    }
}

const getHotelRooms = async (req, res, next) => {
    try {
        const hotel = await Hotel.findById(req.params.id);
        const list = await Promise.all(hotel.rooms.map((room) => {
            return Room.findById(room)
        }));
        res.status(200).json(list)
    } catch (err) {
        next(err)
    }
}

module.exports = {
    createHotel,
    getHotel,
    getHotels,
    deleteHotel,
    updateHotel,
    countByCity,
    countByType,
    getHotelRooms
}