import { useEffect, useState } from "react";

export const useStorage = (getKey, initialValue) => {
    const [value, setValue] = useState(initialValue)
    const key = `editor-${getKey}`;

    useEffect(()=>{
        console.log("start storage", {key, localStorage}, key in localStorage)
        if(!(key in localStorage)) {
            console.log({initialize: {key, initialValue}});
            localStorage.setItem(key, initialValue);
            setValue(initialValue)
        } else {
            console.log(key, "data already exists", localStorage.getItem(key))
            setValue(localStorage.getItem(key))
        }
    }, [])

    const setStorage = (newValue) => {
        console.log("set data", {key, newValue})
        localStorage.setItem(key, newValue);
        setValue(newValue)
    }

    return [value, setStorage as any];
}