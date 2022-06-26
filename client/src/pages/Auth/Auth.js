import React from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { observer } from 'mobx-react-lite'
import { useTranslation } from 'react-i18next';

import { LOGIN_ROUTE, REGISTRATION_ROUTE } from '../../utils/consts'
import Container from '../../components/UI/Container/Container'
import AuthForm from '../../components/forms/AuthForm'

import styles from './Auth.module.scss'

const Auth = observer(() => {
    const i118n = useTranslation()
    const location = useLocation()
    const isLogin = location.pathname === LOGIN_ROUTE

    const loginClass = isLogin ? styles.header__item_active : styles.header__item_disabled
    const registrationClass = !isLogin ? styles.header__item_active : styles.header__item_disabled

    return (
        <Container className={styles.container}> 
            <div className={styles.box}>
                <div className={styles.header}>
                    <h2 className={styles.header__item + ' ' + loginClass}><NavLink to={LOGIN_ROUTE}>{i118n.t('Sign in')}</NavLink></h2>
                    <h2 className={styles.header__item + ' ' + registrationClass}><NavLink to={REGISTRATION_ROUTE}>{i118n.t('Sign up')}</NavLink></h2>
                </div>
                <AuthForm />
            </div>
        </Container>
    ) 
    
})

export default Auth