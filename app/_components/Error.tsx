import React from 'react'

const Error = ({message, className}: { message: string, className?: string }) => {
    return (
        <p className={className}>{message}</p>
    )
}
export default Error
