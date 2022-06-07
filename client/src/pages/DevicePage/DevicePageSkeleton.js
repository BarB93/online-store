import React from 'react'

import Container from '../../components/UI/Container/Container'
import Button from '../../components/UI/Button/Button'

import styles from './DevicePage.module.scss'

const DevicePageSkeleton = () => {
    
    return (
        <Container>
            <article className={`${styles.container} ${styles.skeleton}`}>
                <div className={styles.name}></div>
                <div className={styles.content}>
                    <div className={styles.image}>
                       <div className={styles.image__skeleton}></div>
                    </div>
                    <div className={styles.info}>
                        <div className={styles.info__header}>
                            <div className={styles.info__price_skeleton}></div>   
                        </div>
                        <Button disabled className={styles.info__addToCard} secondary>Добавить в корзину</Button>
                    </div>
                    <div className={styles.features}>
                       <div className={`${styles.features__title_skeleton} ${styles.features__title}`}></div>
                    </div>
                </div>
            </article>
        </Container>
    )
}

export default DevicePageSkeleton