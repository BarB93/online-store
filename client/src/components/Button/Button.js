import React from 'react'

const Button = ({secondary, clickHandler, children}) => {
    let className = secondary ? 'secondary' : ''

    return (
        <button className={'btn ' + className} onClick={clickHandler}>{children}</button>
    )
}

export default Button