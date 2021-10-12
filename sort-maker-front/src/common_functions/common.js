// ======================
// firebase認証の初期設定
// ======================
import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/storage'

export const initializeApp = function () {
    const config = {
        apiKey: 'AIzaSyAzZ5T7Y7n5bAlB9GERaBDpOZW9rUEY_-8',
        authDomain: 'sort-maker-59e03.firebaseapp.com',
        projectId: 'sort-maker-59e03',
        storageBucket: 'sort-maker-59e03.appspot.com',
        messagingSenderId: '1072382239411',
        appId: '1:1072382239411:web:ce106331825496f4d686c6',
        measurementId: 'G-8C3MJ3HPQZ',
    }

    if (firebase.apps.length === 0) {
        firebase.initializeApp(config)
        return firebase
    } else {
        return firebase
    }
}

// ==========================================================
// コンポーネント名に対応するパスの格納およびページ遷移用の関数
// ==========================================================
const urlEndPath = {
    Home: '/',
    Login: '/login',
    MyPage: '/mypage',
    PlaySort: '/play_sort',
    RegisterSort: '/register_sort',
}

export const transitionPage = (component, componentKey) => {
    const endPath = urlEndPath[componentKey]
    if (endPath === component.$router.currentRoute.path) {
        // 同じページに遷移する場合はリロード
        component.$router.go({ path: component.$router.currentRoute.path })
    } else {
        // 違うページに遷移する場合はページ遷移
        component.$router.push(endPath)
    }
}
