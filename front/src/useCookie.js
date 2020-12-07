import { useState } from "react";

const useCookie = (key, defaultValue) => {

    const getItem = key =>
    document.cookie.split("; ").reduce((total, currentCookie) => {
        const item = currentCookie.split("=");
        const storedKey = item[0];
        const storedValue = item[1];
        return key === storedKey
        ? decodeURIComponent(storedValue) 
        : total;
    }, '');
    
    const getCookie = () => getItem(key) || null;
    const [cookie] = useState(getCookie());
 
   return [cookie];
};

export default useCookie