const express = require('express')
const User = require('../models/User')
const auth = require('../middleware/auth')
const axios = require('axios')

const router = new express.Router()

router.post('/users', async (req, res) => {
    const user = new User(req.body)
    try {
        await user.save()
        const token = await user.generateAuthToken()
        res.status(201).send({ user, token })
    } catch (e) {
        res.status(500).send({
            error: e?.message ? e?.message : "Something Went Wrong"
        })
    }
})
router.post('/users/login', async (req, res) => {
    try {
        const user = await User.findByCredentials(req.body.email, req.body.password)
        const token = await user.generateAuthToken()
        res.send({ user, token })
    } catch (e) {
        res.status(500).send({
            error: e?.message ? e?.message : "Something Went Wrong"
        })
    }

})
router.post('/users/logout', auth, async (req, res) => {
    try {
        req.user.tokens = req.user.tokens.filter((token) => {
            return token.token !== req.token
        })
        await req.user.save()
        res.send({
            message: "Logged Out"
        })
    } catch (e) {
        res.status(500).send({
            error: e?.message ? e?.message : "Something Went Wrong"
        })
    }
})

router.get('/users/me', auth, async (req, res) => {
    res.send({ user: req.user })
})

router.delete('/users/me', auth, async (req, res) => {
    try {
        await req.user.remove()
        res.send({
            user: req.user
        })
    } catch (e) {
        res.status(500).send({
            error: e?.message ? e?.message : "Something Went Wrong"
        })
    }
})

router.post("/predict_crop", async (req, res) => {
    try {
        const options = {
            method: "POST",
            url: `http://localhost:5000/predict`,
            headers: {
                "Content-Type": "application/json",
            },
            data: req.body,
        };
        const response = await axios(options);

        res.send({
            message: response.data.message
        })
    } catch (e) {
        res.status(500).send({
            error: e?.message ? e?.message : "Something Went Wrong"
        })
    }
})

module.exports = router