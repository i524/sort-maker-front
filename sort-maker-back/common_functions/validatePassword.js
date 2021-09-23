const validatePassword = function (password) {
    if (password.length === 0) {
        return 'パスワードを入力してください'
    } else if (6 > password.length || password.length > 255) {
        return 'パスワードを6文字以上255文字以下で入力してください'
    } else if (!new RegExp(/^[a-zA-Z0-9!-/:-@¥[-`{-~]+$/).test(password)) {
        return 'パスワードを半角数字記号で入力してください'
    } else {
        return ''
    }
}

module.exports = validatePassword
