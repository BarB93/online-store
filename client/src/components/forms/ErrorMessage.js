import React from 'react'

const ErrorMessage = ({message, children}) => {
    return (
        <div className='form__error'>{children ? children : message}</div>
    )
}

export default ErrorMessage