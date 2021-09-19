// =======================
// ログイン認証
// =======================
export const loginAuth = (component) => {
    return component.$store.getters.userId
}

// =======================
// ページ遷移
// =======================
export const transitionPage = (component, page) => {
    if (page === component.$router.currentRoute.path) {
        // 同じページに遷移する場合はリロード
        component.$router.go({ path: component.$router.currentRoute.path })
    } else {
        // 違うページに遷移する場合はページ遷移
        component.$router.push(page)
    }
}
