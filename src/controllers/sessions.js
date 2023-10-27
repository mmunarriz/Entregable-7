import { userModel } from "../dao/models/user.js";
import { createHash } from "../utils.js";
import jwt from 'jsonwebtoken';

export const login = async (req, res) => {

    const serializedUser = {
        id: req.user._id,
        first_name: req.user.first_name,
        last_name: req.user.last_name,
        name: `${req.user.first_name} ${req.user.last_name}`,
        email: req.user.email,
        cart: req.user.cart,
        role: req.user.role
    }
    const token = jwt.sign(serializedUser, 't0k3nJwtS3cr3t', { expiresIn: '1h' })
    res.cookie('coderCookie', token, { maxAge: 3600000 }).send({ status: "success", payload: serializedUser });
}

export const githubCallback = async (req, res) => {

    const serializedUser = {
        id: req.user._id,
        first_name: req.user.first_name,
        last_name: req.user.last_name,
        email: req.user.email,
        cart: req.user.cart,
        role: req.user.role
    }

    const token = jwt.sign(serializedUser, 't0k3nJwtS3cr3t', { expiresIn: '1h' })
    res.cookie('coderCookie', token, { maxAge: 3600000 })
    res.redirect('/products')
}

export const failLogin = (req, res) => {
    res.status(401).send({ status: "error", error: "Failed login" })
}

export const register = async (req, res) => {
    res.send({ status: "success", message: "Usuario registrado" })
}

export const failRegister = async (req, res) => {
    console.log("Fallo la estrategia");
    res.status(400).send({ status: "error", error: 'Failed register' });
}

export const logout = (req, res) => {
    try {
        res.clearCookie('coderCookie');
        res.redirect('/');
    } catch (error) {
        return res.status(500).send({ status: 'error', error: 'Internal Server Error' });
    }
}

export const current = (req, res) => {
    res.send({ status: "success", payload: req.user })
}