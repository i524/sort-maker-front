const initializeApp = function (firebase) {
    const config = {
        apiKey: 'AIzaSyAVQtyr4Qnc2bdlU2irOWWQT4DX6DnIIDE',
        authDomain: 'sort-maker-97261.firebaseapp.com',
        projectId: 'sort-maker-97261',
        storageBucket: 'sort-maker-97261.appspot.com',
        messagingSenderId: '17511495381',
        appId: '1:17511495381:web:8d02a5f106f2e12026145c',
        measurementId: 'G-FN10FEGE2W',
    }
    if (firebase.apps.length === 0) {
        firebase.initializeApp(config)
    }
}

module.exports = initializeApp
