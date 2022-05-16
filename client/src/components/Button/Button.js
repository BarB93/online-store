import React from 'react'

const Button = (props) => {
    let className = props.secondary ? 'secondary' : ''

    return (
        <button className={'btn ' + className}>{props.children}</button>
    )
}

export default Button