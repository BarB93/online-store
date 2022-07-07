import React, { useContext, useEffect } from 'react'
import { observer } from 'mobx-react-lite'

import { fetchBasketItems } from '../../http/basketAPI'
import { Context } from '../../index'
import Content from '../../components/Basket/Content/Content'
import Container from '../../components/UI/Container/Container'
import Aside from '../../components/Basket/Aside/Aside'

import styles from './Basket.module.scss'

const Basket = observer(() => {
    const {basket, user} = useContext(Context)

    useEffect(() => {
        if(user.isAuth) {
            fetchBasketItems()
                .then(data => {
                    basket.setDevices(data.devices)
                })
        }
    }, [user.isAuth])

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