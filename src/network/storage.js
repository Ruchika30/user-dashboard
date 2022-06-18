


export const getToken = () => {
    if (localStorage.getItem('user'))
        return JSON.parse(localStorage.getItem('user'))

    return undefined
}
