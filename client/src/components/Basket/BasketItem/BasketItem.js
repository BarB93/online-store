import React from 'react'

import styles from './BasketItem.module.scss'

const BasketItem = ({device}) => {
    const imageURL = `${process.env.REACT_APP_API_URL}/${device.img}`
    console.log('dev', device)

    return (
        <div className={styles.device}>
            <div className={styles.device__imageBox}>
                <img className={styles.device__img} src={imageURL} alt={device.name} />
            </div>
            <div className={styles.device__name}>{device.name}</div>
        </div>
    )
}

export default BasketItem