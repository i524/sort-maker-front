import axios from 'axios'

axios.defaults.baseURL = process.env.VUE_APP_API_BASE_URL

// =======================================
// 関数名に対応するパスの格納および共通関数
// =======================================

const apiEndPath = {
    'register-sort': '/register-sort',
    'post-tweet': '/post-tweet',
}

const apiRequest = async (functionKey, postData) => {
    const endPath = apiEndPath[functionKey]
    return await axios.post(endPath, postData)
}

// ========================================
// ソートの登録
//=========================================

export const registerSort = async (postData) => {
    return await apiRequest('register-sort', postData)
        .then((res) => {
            if (res.data.code === 0) {
                return res.data.data
            } else {
                return false
            }
        })
        .catch(() => {
            return false
        })
}

// ========================================
// ツイッターの投稿
//=========================================

export const postTweet = async () => {
    return await apiRequest('post-tweet').then((res) => {
        return res
    })
}
