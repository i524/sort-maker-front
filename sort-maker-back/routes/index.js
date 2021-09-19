const express = require('express')
const router = express.Router()

// ルーティング先に指定するモジュールの読み込み
const test = require('./test.js')

// ルーティング処理
router.use('/', test)

module.exports = router
