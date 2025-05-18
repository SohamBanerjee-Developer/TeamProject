import React, {FC} from 'react'

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement>{
    className: string;
    placeholder?: string;
    name: string;
    id: string;
    type: string;
}

const Input:FC<InputProps> = ({className, placeholder, type, name, id, ...props}) => {
    return (
        <input className={className} placeholder={placeholder} type={type} {...props} name={name} id={id}/>
    )
}
export default Input
