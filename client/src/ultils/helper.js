export const createSlug = (str) => {
    return str.replace(/ /g, '-').toLowerCase()
}