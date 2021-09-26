export const required = (value) => !!value || '必ず入力してください'

export const isValidTextLength = (value) =>
    (value.length >= 1 && value.length) <= 255 ||
    '1文字以上255文字以下で入力してください'
