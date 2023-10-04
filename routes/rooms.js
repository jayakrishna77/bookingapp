const express = require('express');

const { createRoom, updateRoom, deleteRoom, getRoom, getRooms } = require('../controllers/roomControl');
const { verifyAdmin } = require('../utils/verifyToken');

const router = express.Router();

router.post("/:hotelid", verifyAdmin, createRoom);

router.put("/:id", verifyAdmin, updateRoom);

router.delete('/:id/:hotelid', verifyAdmin, deleteRoom);

router.get("/:id", getRoom);

router.get('/', getRooms);

module.exports = router;