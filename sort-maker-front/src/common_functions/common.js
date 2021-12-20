// ======================
// firebase認証の初期設定
// ======================
import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/storage'
import { store } from '../store'

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

// =====================================
// firebasecloudstorageからの画像URL取得
// =====================================
export const getDownloadURL = async (path) => {
    // firebaseの初期設定
    const firebase = initializeApp()

    // 初期設定ができていなかったらエラーメッセージを出す
    if (!firebase) {
        showAlert('画像を表示できませんでした')
        return
    }

    const storageRef = firebase.storage().ref()

    return await storageRef
        .child(path)
        .getDownloadURL()
        .then((url) => {
            return url
        })
        .catch(() => {
            showAlert('画像を表示できませんでした')
        })
}

// =======================================
// firebasecloudstorageからの画像Blob取得
// =======================================
export const getBlob = async (path) => {
    // firebaseの初期設定
    const firebase = initializeApp()

    // 初期設定ができていなかったらエラーメッセージを出す
    if (!firebase) {
        showAlert('画像を表示できませんでした')
        return
    }

    const storageRef = firebase.storage().ref()

    return await storageRef
        .child(path)
        .getDownloadURL()
        .then(async (url) => {
            let blob = null
            const xhr = new XMLHttpRequest()
            xhr.responseType = 'blob'
            xhr.onload = () => {
                blob = xhr.response
            }
            xhr.open('GET', url)
            xhr.send()

            return blob
        })
        .catch(() => {
            showAlert('画像を表示できませんでした')
        })
}

// ===========
// ページ遷移
// ===========
export const transitionPage = (component, name, params = {}) => {
    if (name === component.$router.currentRoute.name) {
        // 同じページに遷移する場合はリロード
        component.$router.go({
            name: component.$router.currentRoute.name,
            params: params,
        })
    } else {
        // 違うページに遷移する場合はページ遷移
        component.$router.push({ name: name, params: params })
    }
}

// =======================
// アラートの表示
// =======================
export const showAlert = (message, color = 'warning') => {
    store.dispatch('updateMessage', message)
    store.dispatch('updateColor', color)
    store.dispatch('updateIsShowAlert', true)
}
