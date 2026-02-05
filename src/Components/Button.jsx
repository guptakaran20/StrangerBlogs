import React from 'react'

function Button({children, 
    type = "button",
    bgColor = "bg-blue-600",
    textColor = "text-white",
    onClick, 
    className,
    ...props}) {   
    return (
        <button type={type} onClick={onClick} className={`${bgColor} ${textColor} ${className}`} {...props}>
            {children}
        </button>
    )
}

export default Button
