const getToday = () => {
    let today = new Date();
    return today.toISOString().slice(0, 10);
}

export const transformDateJson = (date) => {
    return date.split('.').reverse().join('-')
}

export const transformDateHHMM = (date) => {
    let dateString = String(date).slice(0, 16);
    let arr = dateString.split('T')
    return transformDate(arr[0]) + ' ' + arr[1]
}

export const sliceDate = (date) => {
    return String(date).slice(0, 10);
}

export const dateIsValid = (date) => {
    return sliceDate(date) <= getToday();
}

export const transformDate = (date) => {
    let slicedDate = sliceDate(date);
    return slicedDate.split('-').reverse().join('/');
}
