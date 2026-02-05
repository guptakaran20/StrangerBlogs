import React ,{useId}from 'react'

const Input = React.forwardRef(function Input({
    type = "text",
    placeholder = "",
    className = "",
    label = "",
    ...props
}, ref) {
    const id = useId();

    return (
    <div className='w-full'>
        {label && <label htmlFor={id} className='block mb-2 text-sm font-medium text-gray-700'>{label}</label>}
        
        <input
            id={id}
  ref={ref}
  type={type}
  placeholder={placeholder}
  className={`
    ${className}
    w-full px-4 py-2 text-sm
    border border-gray-300 rounded-md
    focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500

    file:mr-4
    file:py-2 file:px-4
    file:rounded-md
    file:border-0
    file:text-sm file:font-medium
    file:bg-blue-50 file:text-blue-700
    hover:file:bg-blue-100
  `}
  {...props}
        />
        </div>
    );
});

export default Input
