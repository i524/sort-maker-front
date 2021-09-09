// ======================= 
// ログイン認証
// ======================= 
export const loginAuth = (component) => {
    return component.$store.getters.userId;
};