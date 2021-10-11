import axios from 'axios'

axios.defaults.baseURL = process.env.VUE_APP_API_BASE_URL

// =======================================
// 関数名に対応するパスの格納および共通関数
// =======================================

const apiEndPath = {
    'post-tweet': '/post-tweet',
}

const apiRequest = async (functionKey, postData) => {
    const endPath = apiEndPath[functionKey]
    return await axios.post(endPath, postData)
}

// ========================================
// ツイッターの投稿
//=========================================

export const postTweet = async () => {
    return await apiRequest('post-tweet').then((res) => {
        return res
    })
}
