const mongoose = require("mongoose");
const User = mongoose.model("User");

exports.get = async () => {
    return await User.find({});
}

exports.authenticate = async (data) => {
    const res = await User.findOne({
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

exports.update = async (id, data) => {
    await User.findByIdAndUpdate(id, {
        $set: {
            name: data.name,
            email: data.email,
            password: data.password
        }
    });
}

exports.delete = async id => {
    await User.findByIdAndRemove(id);
}