import React, {useContext} from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import {observer} from 'mobx-react-lite'

import { Context } from '../../index'
import { LOGIN_ROUTE, SHOP_ROUTE, ADMIN_ROUTE } from '../../utils/consts'
import Button from '../UI/Button/Button'
import Container from '../UI/Container/Container'


import styles from './NavBar.module.scss'
import NavBarSkeleton from './NavBarSkeleton'

const NavBar = observer(() => {
    const {user} = useContext(Context)
    const navigate = useNavigate()

    const logout = () => {
        localStorage.removeItem('token')
        user.setUser({})
        user.setIsAuth(false)
        navigate(LOGIN_ROUTE)
    }

    return (
        user.isLoading ?
        <NavBarSkeleton />
        :
        <header className={styles.header}>
            <Container>
                <nav className={styles.nav}>
                    <NavLink className={styles.logo} to={SHOP_ROUTE}>DeviceShop</NavLink>
                    <ul className={styles.nav__menu}>
                        <li className={styles.nav__item}><NavLink className={styles.nav__link} to={SHOP_ROUTE}>Device</NavLink></li>
                        <li className={styles.nav__item}><NavLink className={styles.nav__link} to={LOGIN_ROUTE}>Login</NavLink></li>
                        <li className={styles.nav__item}><NavLink className={styles.nav__link} to={SHOP_ROUTE}>Basket</NavLink></li>
                        <li className={styles.nav__item}><NavLink className={styles.nav__link} to={SHOP_ROUTE}>Basket</NavLink></li>
                       {user.isAuth ? 
                            <>
                                <Button className={styles.btn} onClick={() => { navigate(ADMIN_ROUTE) }}>Админ панель</Button>
                                <Button className={styles.btn} onClick={logout}>Выйти</Button>
                            </>
                            :
                            <Button className={styles.btn} onClick={() => { navigate(LOGIN_ROUTE) }}>Авторизация</Button>
                       }
                    </ul>
                </nav>
            </Container>
        </header>
    )
})

export default NavBar