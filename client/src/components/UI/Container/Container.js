import React from 'react'

import styles from './Container.module.scss'

const Container = ({children, className}) => {
    let classes = className ? className : ''

    return (
        <div className={styles.container + ' ' + classes}>{children}</div>
    )
}

export default Container