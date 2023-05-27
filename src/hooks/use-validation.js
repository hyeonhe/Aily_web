import { useState } from "react";


const useValidation = (regex, func) => {
    const [isValid, setIsValid] = useState(true);
    const validate = (v) => {
        if (func){
            setIsValid(func(v));
        }
        else{
            setIsValid(regex.test(v));
        }
    }

    return [isValid, validate];
}

export default useValidation;