import React from 'react'

const FormDiv = ({children}: { children: React.ReactNode}) => {
    return (
        <div className="relative w-full">{children}</div>
    )
}
export default FormDiv
