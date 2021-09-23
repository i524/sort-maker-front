export const required = (value) => !!value || '必ず入力してください'

export const isValidEmailLength = (value) =>
    (1 <= value.length && value.length <= 255) ||
    '1文字以上255文字以下で入力してください'

export const isMatchedRegHalf = (value) => {
    const regHalf = new RegExp(/^[a-zA-Z0-9!-/:-@¥[-`{-~]+$/)
    return regHalf.test(value) || '半角数字記号で入力してください'
}

export const isMatchedEmail = (value) => {
    const regEmail = new RegExp(
        /^([a-zA-Z0-9])+([a-zA-Z0-9._-])*@([a-zA-Z0-9_-])+([a-zA-Z0-9._-]+)+$/
    )
    return regEmail.test(value) || 'メールアドレスの形式で入力してください'
}

export const isValidPasswordLength = (value) =>
    (6 <= value.length && value.length <= 255) ||
    '6文字以上255文字以下で入力してください'

export const isSamePassword = (value, password) =>
    value === password || '再入力したパスワードがパスワードと一致していません'
