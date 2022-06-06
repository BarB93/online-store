import React from 'react'

import Container from '../../components/UI/Container/Container'

import styles from './DevicePage.module.scss'

const DevicePageSkeleton = () => {
    
    return (
        <Container>
            <article className={`${styles.container} ${styles.skeleton}`}>
                <div className={styles.name}></div>
                <div className={styles.content}>
                    <div className={styles.image}>
                       
                    </div>
                    <div className={styles.info}>
                        <div className={styles.info__header}>
                            <div className={styles.info__name}></div>
                            <div className={styles.info__price}></div>
                        </div>
                    </div>
                    <div className={styles.features}>
                       <div className={styles.title + ' ' + styles.features__title}></div>
                       <ul className={styles.features__body}>
                            
                       </ul> 
                    </div>
                </div>
            </article>
        </Container>
    )
}

export default DevicePageSkeleton