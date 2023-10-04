const express = require('express');

const { updateUser, deleteUser, getUser, getUsers } = require('../controllers/userControl');
const { verifyToken, verifyUser, verifyAdmin } = require('../utils/verifyToken');

const router = express.Router();

// verifing user token
// router.get('/checkauthentication', verifyToken, (req, res, next) => {
//     res.send("you are logged in");
// });

// verifing user id
// router.get('/checkuser/:id', verifyUser, (req, res, next) => {
//     res.send("you are logged and you can delete user");
// });

// verifing user is Admin or not
// router.get('/checkadmin/:id', verifyAdmin, (req, res, next) => {
//     res.send("you are logged and you are a admin");
// });

router.put("/:id", verifyUser, updateUser);

router.delete('/:id', verifyUser, deleteUser);

router.get("/:id", verifyUser, getUser);

router.get('/',verifyAdmin, getUsers);

module.exports = router;