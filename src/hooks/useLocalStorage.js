import { useState } from 'react';

const handleStorage = (key, value) => {
    if(typeof window === 'undefined')
        return value;

    try{
        const res = localStorage.getItem(key);
        return res ? JSON.parse(res) : value;

    } catch(err){
        console.error(err);
        return value;
    }
}

const useLocalStorage = (key, val) => {
    const [ storedValue, setStoredValue ] = useState(() => handleStorage(key, val));

    const setValue = (value) => {
        try{
            const valueToStore = value instanceof Function ? value(storedValue) : value;
            setStoredValue(valueToStore);

            if(typeof window !== 'undefined')
                localStorage.setItem(key, JSON.stringify(valueToStore));

        } catch(err){
            console.error(err)
        }
    }

    return [storedValue, setValue];
}

export default useLocalStorage;