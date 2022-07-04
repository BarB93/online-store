import React, { useContext } from 'react'

import { Context } from '../../../index'
import BasketItem from '../BasketItem/BasketItem'

import styles from './Content.module.scss'

const Content = () => {
    const {basket} = useContext(Context)

    return (
        <div className={styles.content}>
            {basket.devices && basket.devices.map(item => <BasketItem device={item} />)}
        </div>
    )
}

export default Content