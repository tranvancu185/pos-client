export const debounce = (callback, delay) => {
    let timeout = null;
    console.log('debounce', timeout);
    return ({...args}) => {
        clearTimeout(timeout);
        timeout = setTimeout(()=> {
            callback(...args);
        }, delay)
    }
}