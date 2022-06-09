import React from 'react'

import styles from './SpinnerFacebook.module.scss'

const SpinnerFacebook = ({className}) => {
    return (
        <div className={`${styles.spinner} ${className}`}><div></div><div></div><div></div></div>
    )
}

export default SpinnerFacebook