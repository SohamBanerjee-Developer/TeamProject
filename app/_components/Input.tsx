import React, {FC} from 'react'

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement>{
    className: string;
    placeholder?: string;
    type: string;
}

const Input:FC<InputProps> = ({className, placeholder, type, ...props}) => {
    return (
        <input className={className} placeholder={placeholder} type={type} {...props}/>
    )
}
export default Input
