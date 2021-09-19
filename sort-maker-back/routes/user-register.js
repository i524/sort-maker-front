const express = require('express')
const firebase = require('firebase')
const router = express.Router()

router.get('/user-register', function (req, res) {
    res.json({
        message: 'hello world',
    })
})

module.exports = router
