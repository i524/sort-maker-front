const validateEmail = function (email) {
    if (email.length === 0) {
        return 'emailを入力してください'
    } else if (1 > email.length || email.length > 255) {
        return 'emailを1文字以上255文字以下で入力してください'
    } else if (!new RegExp(/^[a-zA-Z0-9!-/:-@¥[-`{-~]+$/).test(email)) {
        return 'emailを半角英数字記号で入力してください'
    } else if (
        !new RegExp(
            /^([a-zA-Z0-9])+([a-zA-Z0-9._-])*@([a-zA-Z0-9_-])+([a-zA-Z0-9._-]+)+$/
        ).test(email)
    ) {
        return 'emailをメールアドレスの形式で入力してください'
    } else {
        return ''
    }
}

module.exports = validateEmail
