import React, { useState } from 'react'

import { RiArrowUpSLine } from 'react-icons/ri'
import styles from './FilterItem.module.scss'

const FilterItem = ({title, children}) => {
    const [isActive, setIsActive] = useState(true)
    const toggleFilterHandler = () => {
        setIsActive(prev => !prev)
    }
    return (
        <div className={`${styles.filter} ${isActive ? styles.active : ''}`}>
            <div className={styles.filter__titleWrapper} onClick={toggleFilterHandler}>
                <h4 className={styles.filter__title} >{title}</h4>
                <div className={styles.filter__arrow}><RiArrowUpSLine className={styles.filter__arrowIcon}/></div>
            </div>
            <div className={styles.filter__body}>{children}</div>
        </div>
    )
}

export default FilterItem