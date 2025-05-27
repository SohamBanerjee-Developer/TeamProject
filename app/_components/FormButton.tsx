"use client"

import {useFormStatus} from "react-dom";
import {FC} from "react";

interface FormButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>{
    className?: string;
}

const FormButton:FC<FormButtonProps> = ({className, ...props}) => {
    const {pending} = useFormStatus();

    return (
        <button type="submit" className={className} disabled={pending} {...props}>
            {
                pending ? "Loading..." : "Submit"
            }
        </button>
    )
}

export default FormButton
