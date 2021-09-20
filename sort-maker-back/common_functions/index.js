const initializeApp = function (firebase) {
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
}

module.exports = initializeApp
