import React, { useContext, useEffect } from 'react'

import { fetchBasketItems } from '../../http/basketAPI'
import { Context } from '../../index'
import Content from '../../components/Basket/Content/Content'
import Container from '../../components/UI/Container/Container'
import Aside from '../../components/Basket/Aside/Aside'

import styles from './Basket.module.scss'
import { observer } from 'mobx-react-lite';

const Basket = observer(() => {
    const {basket, user} = useContext(Context)

    useEffect(() => {
        console.log('in basket useEFF')
        if(user.isAuth) {
            console.log('in basket useEFF 2')
            fetchBasketItems()
                .then(data => {
                    console.log('in basket useEFF 3', data)
                    basket.setDevices(data.devices)
                    basket.setTotalQuantity(data.totalQuantity)
                })
        }
    }, [user.isAuth])

    console.log('in basket', basket.devices)

    return (
        <Container>
            <div className={styles.basket}>
                <section className={styles.basket__content}><Content /></section>
                <aside className={styles.basket__aside}><Aside /></aside>
            </div>
        </Container>
    )
})

export default Basket