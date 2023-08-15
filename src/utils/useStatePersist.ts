import { useState } from "react";

const useStatePersist = (_key: string, initValue: any) => {
    const key = "hooks: " + _key;
    const value = () => {
        try {
            const item: any = window.localStorage.getItem(key);
            return item ? JSON.parse(item) : initValue
        } catch (err) {
            console.error(err);
            return initValue;
        };
    };

    const setValue = (value: any) => {
        try {
            setSavedValue(value)
            window.localStorage.setItem(key, JSON.stringify(value))
        } catch (err) {
            console.error(err);
        };
    }

    const [savedValue, setSavedValue] = useState(value);
    return [savedValue, setValue];
};

export default useStatePersist;