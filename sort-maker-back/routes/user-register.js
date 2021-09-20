const express = require('express')
const firebase = require('firebase')
const initializeApp = require('../common_functions/initializeApp')
const validateEmail = require('../common_functions/validateEmail')
const validatePassword = require('../common_functions/validatePassword')

const router = express.Router()

router.post('/user-register', function (req, res) {
    // firebaseの設定
    initializeApp(firebase)

    // バリデーションチェック
    const email = req.body.email
    const pass = req.body.pass

    let errorMessage = validateEmail(email)

    if (errorMessage.length === 0) {
        errorMessage = validatePassword(pass)
    }

    if (errorMessage.length !== 0) {
        res.send({
            code: 1,
            data: {},
            message: errorMessage,
        })
    } else {
        // ユーザー登録の処理
        firebase
            .auth()
            .createUserWithEmailAndPassword(email, pass)
            .then(() => {
                res.send({
                    code: 0,
                    data: {},
                    message: 'ユーザー登録に成功しました',
                })
            })
            .catch(() => {
                res.send({
                    code: 1,
                    data: {},
                    message: 'ユーザー登録に失敗しました',
                })
            })
    }
})

module.exports = router
