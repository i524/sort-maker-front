const express = require('express')
const router = express.Router()

// ルーティング先に指定するモジュールの読み込み
const userRegister = require('./user-register.js')

// ルーティング処理
router.use('/', userRegister)

module.exports = router
