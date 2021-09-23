import axios from 'axios'

axios.defaults.baseURL = process.env.VUE_APP_API_BASE_URL

// =======================================
// 関数名に対応するパスの格納および共通関数
// =======================================

const apiEndPath = {
    'user-register': '/user-register',
}

const apiRequest = async (functionKey, postData) => {
    const endPath = apiEndPath['user-register']
    return await axios.post(endPath, postData)
}

// =======================================
// ユーザー登録
// =======================================
export const registerUser = async (postData) => {
    return await apiRequest('user-register', postData)
        .then((res) => {
            return res.data
        })
        .catch(() => {
            return null
        })
}
