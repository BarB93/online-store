import React, { useContext } from 'react'
import { NavLink } from 'react-router-dom'
import { observer } from 'mobx-react-lite'
import { useTranslation } from 'react-i18next'

import { DEVICE_ROUTE, DiSCOUNT } from '../../../utils/consts'
import { Context } from '../../../index'
import pricePrettify from '../../../utils/pricePrettify'
import { getPriceWithoutDiscount } from '../../../utils/getPriceWithoutDiscount'
import QuantityButtons from '../QuantityButtons/QuantityButtons'

import { RiDeleteBin6Fill } from 'react-icons/ri'
import styles from './BasketItem.module.scss'

const BasketItem = observer(({device}) => {
    const {basket} = useContext(Context)
    const i18n = useTranslation()
    const imageURL = `${process.env.REACT_APP_API_URL}/${device.img}`
    const color = device.info.find(item => item.title === 'Color')
    const {name, quantity, price, id} = device 
    const totalPrice = price * quantity
    const priceWithoutDiscount = getPriceWithoutDiscount(totalPrice, DiSCOUNT)
    const discountPrice = priceWithoutDiscount - totalPrice

  
    const orderItemChangeHandler = (e) => {
        if(e.target.checked) {
            basket.addToOrder(id)
        } else {
            basket.removeFromOrder(id)
        }
    }
    const removeItemHandler = () => {
        basket.removeBasketItem(id)
    }
   
    return (
        <div className={styles.device}>
            <div className={styles.device__inner}>
                <div className={styles.device__imageBox}>
                    {
                        basket.isVisibleCheckbox 
                        &&
                        <div className={styles.device__checkboxBox}>
                            <label className='customCheckbox__label'>
                                    <input className='customCheckbox__input' type='checkbox' onChange={orderItemChangeHandler} checked={basket.orderDeviceIds.includes(id)}/>
                                    <div className='customCheckbox__checkbox'></div>
                            </label>
                        </div>
                    }
                    <NavLink to={`${DEVICE_ROUTE}/${device.id}`}>
                        <img className={styles.device__img} src={imageURL} alt={name} />
                    </NavLink>
                </div>
                <div className={styles.device__wrapperInfoAndPrice}>
                    <div className={styles.device__infoBox}>
                        <div className={styles.device__name}><NavLink to={`${DEVICE_ROUTE}/${device.id}`}>{name}</NavLink></div>
                        {color && <div className={styles.device__color}>{i18n.t(color.title)}: {i18n.t(color.description)}</div>}
                    </div>
                    <div className={styles.device__quantityBox}>
                        <div className={styles.device__quantityWrapper}>
                            <QuantityButtons device={device}/>
                        </div>
                        <button className={styles.device__removeBtn} onClick={removeItemHandler}>{i18n.t('Remove')}</button>
                    </div>
                    <div className={styles.device__priceBox}>
                        <div className={styles.device__price}>{pricePrettify(totalPrice)} ₽</div>
                        <div className={styles.device__discount}>
                            <div className={styles.device__price_discount}>{pricePrettify(priceWithoutDiscount)} ₽</div>
                            <div className={styles.discountPopup}>
                                <div className={styles.discountPopup__discount}>{i18n.t('Discount')} {DiSCOUNT}%</div>
                                <div className={styles.discountPopup__price}>-{pricePrettify(discountPrice)} ₽</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className={styles.device__footer}>
                <div className={styles.device__footerQuantityBox}><QuantityButtons device={device}/></div>
                <div className={styles.device__footerRemoveBox}><RiDeleteBin6Fill className={styles.device__footerRemoveIcon}/></div>
            </div>
        </div>
    )
})

export default BasketItem