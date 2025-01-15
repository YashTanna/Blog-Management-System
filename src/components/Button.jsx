import React from 'react'

function Button({
    childern,
    type = 'button',
    bgcolor = 'bg-blue-600',
    textColor = 'text-white',
    className = '',
    ...props
}) {
    return (
    <Button
    className={`px-4 py-2 rounded-lg ${bgcolor} ${textColor} ${className}`}
    type = {type}
    {...props}
    ></Button>
    )
}

export default Button
