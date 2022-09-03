import { useState, useEffect } from 'react';

const getSavedValue = (key, value) => {
    const res = JSON.parse(localStorage.getItem(key));

    if(res) return res;
    if(value instanceof Function) return value();
    return value;
}

const useLocalStorage = (key, val) => {
    const [ storedValue, setStoredvalue ] = useState(() => getSavedValue(key, val));

    useEffect(() =>{
        localStorage.setItem(key, JSON.stringify(storedValue));
    }, [storedValue, key])

    return [storedValue, setStoredvalue];
}

export default useLocalStorage;