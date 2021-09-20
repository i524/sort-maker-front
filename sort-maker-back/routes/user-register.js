const express = require('express')
const firebase = require('firebase')
const initializeApp = require('../common_functions')

const router = express.Router()

router.get('/user-register', function (req, res) {
    // firebaseの設定
    initializeApp(firebase)

    // バリデーションチェック
    // const email = req.email
    // const pass = req.pass
    // if (email.length)
    firebase
        .auth()
        .createUserWithEmailAndPassword('sample2@sample.com', 'sample2')
        .then(() => {
            res.send({
                code: 200,
                data: {},
                message: 'ユーザー登録に成功しました',
            })
        })
        .catch(() => {
            res.send({
                code: 500,
                data: {},
                message: 'ユーザー登録に失敗しました',
            })
        })
})

module.exports = router
