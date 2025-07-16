export const toTitleCase = (str = '') =>
    str
        .trim()
        .split(/\s+/) // dùng regex để xử lý nhiều dấu cách
        .map(word =>
            word ? word.charAt(0).toUpperCase() + word.slice(1).toLowerCase() : ''
        )
        .join(' ');