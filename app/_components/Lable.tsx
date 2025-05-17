import React, {FC} from 'react'

interface LableProps {
    className: string;
    value: string;
}

const Lable:FC<LableProps> = ({className, value}) => {
    return (
        <label className={className}>
            {value}
        </label>
    )
}
export default Lable
