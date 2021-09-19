const express = require('express')
const firebase = require('firebase')
const router = express.Router()

router.get('/user-register', function (req, res) {
    const config = {
        apiKey: 'AIzaSyCEAHNzKTE6YnO4UU1-Ik_Vzq20oWJ9Ftg',
        authDomain: 'sort-maker-f6861.firebaseapp.com',
        projectId: 'sort-maker-f6861',
        storageBucket: 'sort-maker-f6861.appspot.com',
        messagingSenderId: '1076993903791',
        appId: '1:1076993903791:web:5398d1e3ac45046835185a',
        measurementId: 'G-ZLX17697ZS',
    }
    firebase.initializeApp(config)

    firebase
        .auth()
        .createUserWithEmailAndPassword('sample@sample.com', 'sample')
        .then((user) => {
            res.send('Create account: ', user.email)
        })
        .catch((error) => {
            res.send(error.message)
        })
})

module.exports = router
