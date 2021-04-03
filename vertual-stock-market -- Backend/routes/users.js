const express = require('express');
const router = express.Router();
const { User, validateUser } = require('../models/user');
const bcrypt = require('bcrypt');

router.get('/', async (req, res) => {
    res.send('form user router');
})

router.post('/', async (req, res) => {

    const { error } = validateUser(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let user = await User.findOne({ Email: req.body.Email });
    if (user) return res.status(400).send('Username already exists !');


    user = new User(req.body);
    const salt = await bcrypt.genSalt(10);
    user.Password = await bcrypt.hash(user.Password, salt);
    await user.save();
    const token = await user.genrateAuthToken();

    res
        .header('x-auth-token', token)
        .header("access-control-expose-headers", "x-auth-token")
        .send(token);
});

module.exports = router;