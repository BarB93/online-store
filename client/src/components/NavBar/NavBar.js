import React, {useContext} from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import {observer} from 'mobx-react-lite'
import { useTranslation } from 'react-i18next'

import { Context } from '../../index'
import { LOGIN_ROUTE, SHOP_ROUTE, ADMIN_ROUTE } from '../../utils/consts'
import { languages } from '../../utils/consts'
import Button from '../UI/Button/Button'
import Container from '../UI/Container/Container'
import CustomSelect from '../UI/CustomSelect'
import NavBarSkeleton from './NavBarSkeleton'
import { createToast } from '../UI/Toast/Toast'


import styles from './NavBar.module.scss'

const NavBar = observer(() => {
    const {user, toast, app} = useContext(Context)
    const navigate = useNavigate()
    const i18n = useTranslation()

    const logout = () => {
        localStorage.removeItem('token')
        user.setUser({})
        user.setIsAuth(false)
        navigate(LOGIN_ROUTE)
    }

    const handleChangeLanguage = (option) => {
        app.setLang(option.value)
    }

    return (
        user.isLoading ? <NavBarSkeleton />
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
                        <li className={styles.nav__item} onClick={() => toast.addToast(createToast('Тост успешно добавлен!'))}><span className={styles.nav__link}>add toast</span></li>
                        <li className={styles.nav__item}>
                            <CustomSelect 
                                className={styles.nav__select}
                                options={[
                                    {value: languages.russian, label: 'Русский'},
                                    {value: languages.english, label: 'English'}
                                ]}
                                onChange={handleChangeLanguage}
                                value={app.lang}
                            />
                        </li>
                       {user.isAuth ? 
                            <>
                                <Button className={styles.btn} onClick={() => { navigate(ADMIN_ROUTE) }}>{i18n.t('Admin Dashboard')}</Button>
                                <Button className={styles.btn} onClick={logout}>{i18n.t('Logout')}</Button>
                            </>
                            :
                            <Button className={styles.btn} onClick={() => { navigate(LOGIN_ROUTE) }}>{i18n.t('Login')}</Button>
                       }
                    </ul>
                </nav>
            </Container>
        </header>
    )
})

export default NavBar