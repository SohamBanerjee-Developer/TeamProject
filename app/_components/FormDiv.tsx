import React from 'react'

const FormDiv = ({children}: { children: React.ReactNode}) => {
    return (
        <div className="relative w-full flex  flex-col items-start gap-2">{children}</div>
    )
}
export default FormDiv
