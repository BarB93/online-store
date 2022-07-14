import React, { useContext, useEffect, useState } from 'react'
import { observer } from 'mobx-react-lite';
import {useParams} from 'react-router-dom'
import { useTranslation } from 'react-i18next'

import deviceAPI from '../../http/deviceAPI'
import { Context } from '../../index'
import pricePrettify from '../../utils/pricePrettify'
import Container from '../../components/UI/Container/Container'
import Button from '../../components/UI/Button/Button'
import DevicePageSkeleton from './DevicePageSkeleton'

import styles from './DevicePage.module.scss'

const DevicePage = observer(() => {
    const i18n = useTranslation()
    const {device: devStore} = useContext(Context)
    const [device, setDevice] = useState({info: []})
    const {id} = useParams()
    const imageURL = device.img ? `${process.env.REACT_APP_API_URL}/${device?.img}` : ''

    useEffect(() => {
        devStore.setIsLoadingOneDevice(true)
        deviceAPI.fetchOneDevice(id).then(data => setDevice(data))
        .catch(e => alert(e))
        .finally(() => devStore.setIsLoadingOneDevice(false))
    }, [])
    
    return (
        devStore.isLoadingOneDevice ? <DevicePageSkeleton />
        :
        <Container>
            <article className={styles.container}>
                <h1 className={styles.name}>{device.name}</h1>
                <div className={styles.content}>
                    <div className={styles.image}>
                        <img src={imageURL} alt={device.name} />
                    </div>
                    <div className={styles.info}>
                        <div className={styles.info__header}>
                            <div className={styles.info__name}>{i18n.t('Price')}:</div>
                            <div className={styles.info__price}>{pricePrettify(device.price)} ₽</div>
                        </div>
                        <Button className={styles.info__addToCard} secondary bold>{i18n.t('Add to basket')}</Button>
                    </div>
                    <div className={styles.features}>
                       <h3 className={`${styles.title} ${styles.features__title}`}>{i18n.t('Specifications')}</h3>
                       <ul className={styles.features__body}>
                            {device.info.map(({id, title, description}) => 
                                <li key={id} 
                                    className={styles.features__item}
                                >
                                    <div className={styles.features__name}>
                                        <span>{i18n.t(title)}</span>
                                        <div className={styles.features__underline}></div> 
                                    </div>
                                    <div className={styles.features__value}>{i18n.t(description)}</div>
                                </li>)}
                       </ul> 
                    </div>
                </div>
            </article>
        </Container>
    )
})

export default DevicePage