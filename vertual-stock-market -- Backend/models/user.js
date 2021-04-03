const mongoose = require("mongoose");
const jwt = require('jsonwebtoken');
const Joi = require('joi');
const userSchema = new mongoose.Schema({
    Username: String,
    Email: String,
    Password: String
});

userSchema.methods.genrateAuthToken = async function () {
    const token = jwt.sign({ _id: this._id, Username: this.Username }, "key");
    return token;
};

const User = mongoose.model('users', userSchema);

function validateUser(user) {
    const schema = Joi.object({

        Username: Joi.string().min(5).max(255).required(),
        Email: Joi.string().email().required(),
        Password: Joi.string().min(5).max(1024).required()
    });
    const result = schema.validate(user);
    return result;
}

module.exports.User = User;
module.exports.validateUser = validateUser;
