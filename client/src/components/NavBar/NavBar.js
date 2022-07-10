import React, {useContext, useState} from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import {observer} from 'mobx-react-lite'
import { useTranslation } from 'react-i18next'

import { Context } from '../../index'
import { LOGIN_ROUTE, REGISTRATION_ROUTE, SHOP_ROUTE, ADMIN_ROUTE, DEVICE_ROUTE, BASKET_ROUTE } from '../../utils/consts'
import { languages } from '../../utils/consts'
import Container from '../UI/Container/Container'
import LangSelect from './LangSelect/LangSelect'
import NavBarSkeleton from './NavBarSkeleton'
import Logo from './Logo/Logo'

import { RiShoppingCartLine, RiUserLine, RiGlobalLine } from 'react-icons/ri'
import styles from './NavBar.module.scss'

const NavBar = observer(() => {
    const {user, app, basket} = useContext(Context)
    const [isOpenMenuLang, setIsOpenMenuLang] = useState(false)
    const navigate = useNavigate()
    const i18n = useTranslation()

    const logout = () => {
        localStorage.removeItem('token')
        user.setUser({})
        user.setIsAuth(false)
        user.setIsAdmin(false)
        app.setIsOpenUserMenu(false)
        navigate(DEVICE_ROUTE)
    }

    const openUserMenu = () => {
        app.setIsOpenUserMenu(true)
    }

    const closeUserMenu = () => {
        app.setIsOpenUserMenu(false)
    }

    const languageChangeHandler = (option) => {
        app.setLang(option.value)
    }

    const toggleOpenMenuLang = (e) => {
        setIsOpenMenuLang(prev => !prev)
    }
 
    return (
        user.isLoading ? <NavBarSkeleton />
        :
        <header className={styles.header}>
            <Container>
                <nav className={styles.nav}>
                    <NavLink className={styles.logo} to={SHOP_ROUTE}><Logo /></NavLink>
                    <ul className={styles.nav__menu}>
                        <div className={styles.nav__itemsLeft}>
                            <li className={styles.nav__item}><NavLink className={navData => navData.isActive ? `${styles.nav__link} ${styles.nav__link_active}` : styles.nav__link} to={SHOP_ROUTE}>{i18n.t('Devices')}</NavLink></li>
                        </div>
                        <div className={styles.nav__itemsRight}>
                            <li className={`${styles.nav__item} ${styles.nav__item_lang}`}>
                                <div className={styles.nav__langLabel} onClick={(e) => toggleOpenMenuLang()}>
                                    <RiGlobalLine className={styles.nav__langIcon}/>
                                    <LangSelect 
                                        className={styles.nav__select}
                                        options={[
                                            {value: languages.russian, label: 'Rus'},
                                            {value: languages.english, label: 'Eng'}
                                        ]}
                                        onChange={languageChangeHandler}
                                        value={app.lang}
                                        menuIsOpen={isOpenMenuLang}
                                    />
                                </div>
                            </li>
                            <li className={`${styles.nav__item} ${styles.nav__item_icon} ${styles.nav__item_basket}`}>
                                <NavLink className={`${styles.nav__itemLink}`} to={BASKET_ROUTE}>
                                    <div className={styles.basketWrapper}>
                                        <RiShoppingCartLine className={`${styles.nav__icon}  ${styles.nav__icon_basket}`} />
                                        {Boolean(basket.totalQuantity) && <div className={styles.basketQuantity}>{basket.totalQuantity}</div>}
                                    </div>
                                </NavLink>
                            </li>
                            <li className={`${styles.nav__item} ${styles.nav__item_user} ${styles.nav__item_icon} ${app.isOpenUserMenu ? styles.active : ''}`} onMouseEnter={openUserMenu} onMouseLeave={closeUserMenu}>
                                <RiUserLine className={`${styles.nav__icon}  ${styles.nav__icon_user}`} />
                                <ul className={styles.userMenu} >
                                    {user.isAuth ? 
                                        <>
                                            <div className={styles.userMenu__email}>{user.user.email}</div>
                                            {user.isAdmin && <li className={styles.userMenu__item}><NavLink className={styles.userMenu__link} to={ADMIN_ROUTE}>{i18n.t('Admin Dashboard')}</NavLink></li>}
                                            <li className={styles.userMenu__item}><NavLink className={styles.userMenu__link} to={LOGIN_ROUTE}>{i18n.t('My Orders')}</NavLink></li>
                                            <li className={styles.userMenu__item} onClick={logout}><div className={styles.userMenu__link}>{i18n.t('Logout')}</div></li>
                                        </>
                                        :
                                        <>
                                            <li className={styles.userMenu__item}><NavLink className={styles.userMenu__link} to={REGISTRATION_ROUTE}>{i18n.t('Sign up')}</NavLink></li>
                                            <li className={styles.userMenu__item}><NavLink className={styles.userMenu__link} to={LOGIN_ROUTE}>{i18n.t('Sign in')}</NavLink></li>
                                        </>
                                    }
                                </ul>
                            </li>
                        </div>
                    </ul>
                </nav>
            </Container>
        </header>
    )
})

export default NavBar