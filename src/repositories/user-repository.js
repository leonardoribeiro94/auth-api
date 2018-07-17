const mongoose = require("mongoose");
const User = mongoose.model("User");

exports.authenticate = async (data) => {
    const res = await user.findOne({
        email: data.email,
        password: data.password
    });

    return res;
}

exports.create = async (data) => {
    // recupera o token
    let user = new User(data);
    await user.save();
}

exports.getById = async (id) => {
    return await user.findById(id);
}