import React, { useContext } from 'react'
import { observer } from 'mobx-react-lite'

import { Context } from '../../../index'
import ButtonQuantity from '../../UI/ButtonQuantity/ButtonQuantity'

import styles from './QuantityButtons.module.scss'

const QuantityButtons = observer(({device}) => {
    const {basket} = useContext(Context)
    const {id, quantity} = device

    const increaseHeadler = async () => {
        const newQuantity = quantity + 1
        basket.setDeviceQuantity(id, newQuantity)
    }
    const decreaseHeadler = async () => {
        const newQuantity = quantity - 1
        if(newQuantity > 0) {
            basket.setDeviceQuantity(id, newQuantity)
        }
    }

    return (
        <div className={styles.container}>
            <ButtonQuantity className={styles.btn} disabled={quantity <= 1} minus onClick={decreaseHeadler}/>
            <span className={styles.quantity}>{quantity}</span>
            <ButtonQuantity className={styles.btn} plus onClick={increaseHeadler}/>
        </div>
    )
})

export default QuantityButtons