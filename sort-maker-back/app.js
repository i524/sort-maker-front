const express = require('express')
const app = express()
const port = process.env.port || 3000

// ルーティング読み込み
const router = require('./routes')
app.use('/', router)

// サーバー起動
app.listen(port, () => console.log(`Example app listening on port ${port}!`))
