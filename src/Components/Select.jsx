import React, { useId } from 'react'

function Select({
    options,
    label,
    className = "",
    ...props
}, ref) {
    const id = useId();
    return (
        <div className='w-full'>
            {label && <label htmlFor={id} className='block mb-1 text-sm font-medium text-gray-700 tracking-wide'>{label}</label>}
            <select
                {...props}
                id={id}
                ref={ref}
                className={` w-full rounded-md border border-gray-400 bg-gray-100 px-3 py-2 text-sm text-gray-800 shadow-sm transition-all duration-200 hover:bg-gray-50 hover:border-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-600 focus:border-gray-600 ${className}`}
            >
                {options?(options.map((option) => (
                    <option key={option} value={option}>
                        {option}
                    </option>
                ))):null}
            </select>
        </div>
    )
}

export default React.forwardRef(Select)
