import React, { useContext, useEffect } from 'react'
import { observer } from 'mobx-react-lite'
import { NavLink } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

import { DEVICE_ROUTE } from '../../utils/consts'
import { Context } from '../../index'
import Content from '../../components/Basket/Content/Content'
import Container from '../../components/UI/Container/Container'
import Aside from '../../components/Basket/Aside/Aside'
import Button from '../../components/UI/Button/Button'
import BasketSkeleton from './BasketSkeleton'
import Modal from '../../components/UI/Modal/Modal'

import styles from './Basket.module.scss'

const Basket = observer(() => {
    const {basket, user} = useContext(Context)
    const i18n = useTranslation()

    useEffect(() => {
        if(user.isAuth) {
            basket.fetchBasketItems()
        }
    }, [])

    return (
        <Container>
            {
                basket.isDevicesLoading ? <BasketSkeleton />
                :
                basket.devices.length ? 
                <div className={styles.basket}>
                    <section className={styles.basket__content}><Content /></section>
                    <aside className={styles.basket__aside}><Aside /></aside>
                </div>
                :
                <div className={styles.basketEmpty}>
                    <h3 className={styles.basketEmpty__title}>{i18n.t('There are nothing in basket yet')}</h3>
                    <p className={styles.basketEmpty__message}>{i18n.t('Start from home page, select device and add it into basket, enjoy purchases')}</p>
                    <NavLink to={DEVICE_ROUTE}><Button className={styles.basketEmpty__btn} secondary>{i18n.t('Move to home page')}</Button></NavLink>
                </div>
            
            }
            <Modal 
                active={basket.isOpenEmtyOrderModal}
                setActive={basket.setIsOpenEmtyOrderModal.bind(basket)}
            >
                <div className={styles.basket__modal}>
                    {i18n.t('To make order, choose goods')}
                </div>
            </Modal>
        </Container>
    )
})

export default Basket