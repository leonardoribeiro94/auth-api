"use strict";

const jwt = require("jsonwebtoken");
const response = require("../shared/request-status-message");

exports.generateToken = async (data) => {
    return jwt.sign(data, global.SALT_KEY, { expiresIn: "1d" });
}

exports.decodeToken = async (token) => {
    let data = await jwt.verify(token, global.SALT_KEY);
    return data;
}

exports.authorize = (req, res, next) => {
    let token = req.body.token || req.query.token || req.headers['x-access-token'];

    if (!token) {
        return response.unauthorized(res, "Access Restrict");
    }

    jwt.verify(token, global.SALT_KEY, (error) => {
        if (error) {
            return response.unauthorized(res, "Invalid Token!");
        }

        next();
    });
}