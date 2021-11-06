export const required = (value) => !!value || '必ず入力してください'

export const isValidTextLength = (value, length) =>
    (value.length >= 1 && value.length) <= length ||
    '1文字以上255文字以下で入力してください'

export const isValidPostTextLength = (value) =>
    (value.length >= 1 && value.length) <= 128 ||
    '1文字以上128文字以下で入力してください'
