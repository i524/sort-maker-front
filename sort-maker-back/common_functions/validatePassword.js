const validatePassword = function (pass) {
    if (pass.length === 0) {
        return 'パスワードを入力してください'
    } else if (1 > pass.length || pass.length > 255) {
        return 'パスワードを1文字以上255文字以下で入力してください'
    } else if (!new RegExp(/^[a-zA-Z0-9!-/:-@¥[-`{-~]+$/).test(pass)) {
        return 'パスワードを半角数字記号で入力してください'
    } else {
        return ''
    }
}

module.exports = validatePassword
