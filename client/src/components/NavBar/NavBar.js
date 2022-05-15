import React, {useContext} from 'react'
import { NavLink } from 'react-router-dom'

import { Context } from '../../index'
import { SHOP_ROUTE } from '../../utils/consts'

import styles from './NavBar.module.scss'

const NavBar = () => {
    const {user} = useContext(Context)

    return (
        <header className={styles.header}>
            <div className={'container '}>
                <nav className={styles.nav}>
                    <NavLink className={styles.logo} to={SHOP_ROUTE}>DeviceShop</NavLink>
                    <ul className={styles.nav__menu}>
                        <li className={styles.nav__item}><NavLink className={styles.nav__link} to={SHOP_ROUTE}>Device</NavLink></li>
                        <li className={styles.nav__item}><NavLink className={styles.nav__link} to={SHOP_ROUTE}>Basket</NavLink></li>
                        <li className={styles.nav__item}><NavLink className={styles.nav__link} to={SHOP_ROUTE}>Basket</NavLink></li>
                        <li className={styles.nav__item}><NavLink className={styles.nav__link} to={SHOP_ROUTE}>Basket</NavLink></li>
                    </ul>
                </nav>
            </div>
        </header>
    )
}

export default NavBar