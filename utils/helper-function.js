export const normalize = (str) =>
    str.trim().toLowerCase().replace(/\s+/g, ""); // bỏ khoảng trắng, chữ thường

export const formatDateToHHmm = (date) => {
    if (!(date instanceof Date)) return "";

    const hours = date.getHours().toString().padStart(2, 0);
    const minutes = date.getMinutes().toString().padStart(2, 0);
    return `${hours}:${minutes}`;
}