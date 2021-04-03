const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const { User } = require('../models/user');
const _ = require('lodash');
const bcrypt = require('bcrypt');
const Joi = require('joi');


router.post('/', async (req, res) => {

    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let user = await User.findOne({ Email: req.body.Email });
    if (!user) return res.status(400).send('Invalid Email or password  !');

    const validPassword = await bcrypt.compare(req.body.Password, user.Password);
    if (!validPassword) return res.status(400).send('Invalid Email or password !');

    const token = await user.genrateAuthToken();
    res.send(token);
});

function validate(req) {
    const schema = Joi.object({

        Email: Joi.string().min(5).max(255).required(),
        Password: Joi.string().min(5).max(1024).required()
    });
    const result = schema.validate(req);
    return result;
}

module.exports = router;