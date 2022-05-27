import React from 'react'
import {NavLink, useLocation} from 'react-router-dom'
import {Formik, Form, Field, ErrorMessage} from 'formik'
import * as Yup from 'yup'

import { LOGIN_ROUTE, REGISTRATION_ROUTE } from '../../utils/consts'
import Button from '../../components/UI/Button/Button'
import Container from '../../components/UI/Container/Container'

import styles from './Auth.module.scss'

const Auth = () => {

    const location = useLocation()
    const isLogin = location.pathname === LOGIN_ROUTE

    const loginClass = isLogin ? styles.header__item_active : styles.header__item_disabled
    const registrationClass = !isLogin ? styles.header__item_active : styles.header__item_disabled

    return (
        <Container className={styles.container}> 
            <div className={styles.box}>
                <div className={styles.header}>
                    <h2 className={styles.header__item + ' ' + loginClass}><NavLink to={LOGIN_ROUTE}>Войти</NavLink></h2>
                    <h2 className={styles.header__item + ' ' + registrationClass}><NavLink to={REGISTRATION_ROUTE}>Регистрация</NavLink></h2>
                </div>
                <Formik
                    initialValues={{ email: '', password: '' }}
                    validationSchema={Yup.object({
                        firstName: Yup.string()
                        .max(15, 'Must be 15 characters or less')
                        .required('Required'),
                        lastName: Yup.string()
                        .max(20, 'Must be 20 characters or less')
                        .required('Required'),
                        email: Yup.string().email('* Некорректный email').required('* Обязательное поле'),
                        password: Yup.string().required('* Обязательное поле')
                    })}
                    onSubmit={(values, { setSubmitting }) => {
                        setTimeout(() => {
                        alert(JSON.stringify(values, null, 2));
                        setSubmitting(false);
                        }, 400);
                    }}
                >
                    <Form>
                        <label className='form__label' htmlFor='email'>Email</label>
                        <Field name='email' type='text' placeholder='Введите email...' />
                        <ErrorMessage className='error-message' name='email' component="div" />
                
                        <label className='form__label' htmlFor='password'>Пароль</label>
                        <Field name='password' type='password' placeholder='Введите пароль...' />
                        <ErrorMessage className='error-message' name='password' component="div" />
    
                        <div className='form__footer'>
                            <Button className={styles.btn} secondary type='submit'>{isLogin ? 'Boйти' : 'Регистрация'}</Button>
                        </div>
                    </Form>
                </Formik>
            </div>
        </Container>
    ) 
    
}

export default Auth