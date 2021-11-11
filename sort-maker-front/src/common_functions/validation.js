export const required = () => {
    return (value) => !!value || '必ず入力してください'
}

export const isValidTextLength = (min, max) => {
    return (value) =>
        (value.length >= min && value.length <= max) ||
        `${min}文字以上${max}文字以下で入力してください`
}
