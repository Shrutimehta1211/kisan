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
        // var options = {
        //     "method": "GET",
        //     "url": `https://api.ambeedata.com/weather/latest/by-lat-lng?lat=${req.body.lat}&lng=${req.body.long}`,
        //     "headers": {
        //         "x-api-key": process.env.AMBEE_API_KEY,
        //         "Content-type": "application/json"
        //     }
        // };
        // var weatherRes = await axios(options);
        // console.log(weatherRes.data.data);
        // const weatherData = weatherRes.data.data.data
        
        const data = {
            temperature: Math.abs(req.body.long/2),
            humidity: Math.abs(req.body.lat),
            rainfall: Math.abs(req.body.lat)*100,
            water: Math.abs(req.body.long)*10,
            phosphorus: Math.abs(req.body.lat),
            nitrogen: Math.abs(req.body.long),
            potassium: Math.abs(req.body.long),
            ph: 6
        }
        console.log(data)
        var options = {
            method: "POST",
            url: `http://localhost:5000/predict`,
            headers: {
                "Content-Type": "application/json",
            },
            data,
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