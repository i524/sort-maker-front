// =======================
// ログイン認証
// =======================
export const loginAuth = (component) => {
    return component.$store.getters.userId
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
