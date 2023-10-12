const express = require('express');

const { 
    createHotel, 
    updateHotel, 
    deleteHotel, 
    getHotel, 
    getHotels,
    countByCity,
    countByType,
    getHotelRooms
} = require('../controllers/hotelControl');
const { verifyAdmin } = require('../utils/verifyToken');

const router = express.Router();

router.post("/", verifyAdmin, createHotel);

router.put("/:id", verifyAdmin, updateHotel);

router.delete('/:id', verifyAdmin, deleteHotel);

router.get("/:id", getHotel);

router.get('/', getHotels);

router.get('/find/countByCity', countByCity);

router.get('/find/countByType', countByType);

router.get('/room/:id', getHotelRooms)

module.exports = router