import React from 'react'

import Container from '../../components/UI/Container/Container'

import styles from './DevicePage.module.scss'
import pricePrettify from '../../utils/pricePrettify';
import Button from '../../components/UI/Button/Button'

const DevicePage = () => {
    const device =  {id: 1, name: 'Note 12', prece: 15, rating: 5, price: 15000, img: 'https://img.giznext.com/assets/model/4/13039/xiaomi-mobiles-xiaomi-redmi-note-12-pro-max-1626950748.jpg?width=160'}
    const features = [
        {id: 1, name: 'Цвет', value: 'Белый'},
        {id: 2, name: 'Память', value: '64 Гб'},
        {id: 3, name: 'Вес', value: '200 Грамм'},
        {id: 4, name: 'Цвет', value: 'Белый'},
        {id: 5, name: 'Память', value: '64 Гб'},
        {id: 6, name: 'Вес', value: '200 Грамм'},
    ]

    return (
        <Container>
            <article className={styles.container}>
                <h1 className={styles.name}>{device.name}</h1>
                <div className={styles.content}>
                    <div className={styles.image}>
                        <img src={device.img} alt={device.name} />
                    </div>
                    <div className={styles.info}>
                        <div className={styles.info__header}>
                            <div className={styles.info__name}>Цена:</div>
                            <div className={styles.info__price}>{pricePrettify(device.price)} ₽</div>
                        </div>
                        <Button className={styles.info__addToCard} secondary>Добавить в корзину</Button>
                    </div>
                    <div className={styles.features}>
                       <h3 className={styles.title + ' ' + styles.features__title}>Характеристики</h3>
                       <ul className={styles.features__body}>
                            {features.map(({id, name, value}) => 
                                <li key={id} 
                                    className={styles.features__item}
                                >
                                    <div className={styles.features__name}>
                                        <span>{name}</span>
                                        <div className={styles.features__underline}></div> 
                                    </div>
                                    <div className={styles.features__value}>{value}</div>
                                </li>)}
                       </ul> 
                    </div>
                </div>
            </article>
        </Container>
    )
}

export default DevicePage