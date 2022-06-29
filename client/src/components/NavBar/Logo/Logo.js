import React from 'react'
import { RiHome2Fill, RiCpuLine } from 'react-icons/ri'

import styles from './Logo.module.scss'

const Logo = () => {
    return (
        <div className={styles.logo}>
            <div className={styles.logo__wrapper}>
                <div className={styles.logo__icon}><RiHome2Fill /></div>
                <div className={styles.logo__icon}><RiCpuLine /></div>
            </div>
        </div>
    )
}

export default Logo