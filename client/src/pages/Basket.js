import React, { useContext, useEffect } from 'react'

import { fetchBasketItems } from '../http/basketAPI'
import { Context } from '../index'

const Basket = () => {
    const {basket, user} = useContext(Context)

    useEffect(() => {
        if(user.isAuth) {
            fetchBasketItems()
                .then(data => {
                    basket.setDevices(data.devices)
                    basket.setTotalQuantity(data.totalQuantity)
                })
        }
    }, [user.isAuth])

    return (
        <div>BASKET PAGE</div>
    )
}

export default Basket