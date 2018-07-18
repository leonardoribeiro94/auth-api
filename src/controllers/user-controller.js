"use strict";

const userRepository = require("../repositories/user-repository");
const authService = require("../services/auth-service");
const md5 = require("md5");
const response = require("../shared/request-status-message");

exports.post = async (req, res, next) => {
    try {
        await userRepository.create({
            name: req.body.name,
            email: req.body.email,
            password: md5(req.body.password, + global.SALT_KEY)
        });

        response.ok(res, "User registered with success!");
    } catch (error) {
        response.internalError(res, error);
    }
}

exports.put = async (req, res) => {
    try {
        await userRepository.update(req.body.id, {            
            name: req.body.name,
            email: req.body.email,
            password: md5(req.body.password + global.SALT_KEY)
        });

        response.ok(res, "User updateded with sucess");
    } catch (error) {
        response.internalError(res, error);
    }
}

exports.authenticate = async (req, res) => {
    try {
        const user = await userRepository.authenticate({
            email: req.body.email,
            password: md5(req.body.password + global.SALT_KEY)
        });

        if (!user) {
            return response.notFound(res, "E-mail or password invalid!");
        }

        const token = await authService.generateToken({
            id: user._id,
            email: user.email,
            name: user.name,
        });

        res.status(200).send({
            token: token,
            result: {
                email: user.email,
                name: user.name
            }
        })
    } catch (error) {
        response.internalError(res, error);
    }
}

exports.refreshToken = async (req, res, nex) => {
    try {
        const token = req.body.token || req.query.token || req.headers["x-access-token"];
        const data = authService.decodeToken();
        const user = await userRepository.getById(data.id);

        if (!user) {
            return response.notFound(res, "User not found!");
        }

        const tokenData = await authService.generateToken({
            id: user._id,
            email: user.email,
            name: user.name
        });

        res.status(200).send({
            token: tokenData,
            result: {
                email: user.email,
                name: user.name
            }
        });
    } catch (error) {
        response.internalError(res, error);
    }
}

exports.getAll = async (req, res) => {
    try {
        let data = await userRepository.get();
        return response.ok(res, data);
    } catch (error) {
        response.internalError(res, error);
    }
}