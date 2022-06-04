import React, { useContext, useState } from 'react'
import { NavLink, useLocation, useNavigate } from 'react-router-dom'
import { observer } from 'mobx-react-lite'
import { useFormik } from 'formik'
import * as Yup from 'yup'

import { Context } from '../../index'
import { login, registration } from '../../http/userAPI'
import { LOGIN_ROUTE, REGISTRATION_ROUTE, SHOP_ROUTE } from '../../utils/consts'
import Button from '../../components/UI/Button/Button'
import Container from '../../components/UI/Container/Container'

import styles from './Auth.module.scss'

const Auth = observer(() => {
    const [error, setError] = useState(null)
    const {user} = useContext(Context)
    const location = useLocation()
    const navigate = useNavigate()
    const isLogin = location.pathname === LOGIN_ROUTE

    const loginClass = isLogin ? styles.header__item_active : styles.header__item_disabled
    const registrationClass = !isLogin ? styles.header__item_active : styles.header__item_disabled

    const authHandler = async (email, password) => {
        try {
            let data
            if(error) setError(null)
            if(isLogin) {
                data  = await login(email, password)
            } else {
                data = await registration(email, password)
            }
    
            user.setUser(data)
            user.setIsAuth(true)
            navigate(SHOP_ROUTE)
        } catch (e) {
            setError(e.response.data.message)
        }
    }

    const formik = useFormik({
        initialValues: { email: '', password: '' },
        validationSchema: Yup.object({
            email: Yup.string().email('Некорректный email').required('Укажите email'),
            password: Yup.string().required('Укажите пароль')
                .min(3, 'Пароль минимум 3 символа')
                .max(20, 'Пароль максимум 20 символов')
        }),
        onSubmit: (values, { setSubmitting }) => {
            authHandler(values.email, values.password)
            setSubmitting(false)
        },
        isValid: false,
    })
    
    return (
        <Container className={styles.container}> 
            <div className={styles.box}>
                <div className={styles.header}>
                    <h2 className={styles.header__item + ' ' + loginClass}><NavLink to={LOGIN_ROUTE}>Войти</NavLink></h2>
                    <h2 className={styles.header__item + ' ' + registrationClass}><NavLink to={REGISTRATION_ROUTE}>Регистрация</NavLink></h2>
                </div>

                <form onSubmit={formik.handleSubmit} onChange={()=> {
                    setError(null)
                }}>
                    <div className='form__field'>
                        <label className='form__label' htmlFor='email'>Email</label>
                        <input 
                            className='form__input' 
                            id='email' 
                            type='text'
                            {...formik.getFieldProps('email')}
                            placeholder='Введите email...'       
                        />
                       
                    </div>
                
                    <div className='form__field'>
                        <label className='form__label' htmlFor='password'>Пароль</label>
                        <input 
                            className='form__input'
                            id='password'
                            type='password'
                            {...formik.getFieldProps('password')}
                            placeholder='Введите пароль...' 
                        />      
                    </div>

                    <div className={`form__footer ${styles.footer}`}>
                        {
                            (error && <div className={styles.error}>{error}</div>)
                            ||
                            ((formik.errors.email && formik.touched.email) && <div className={styles.error}>{formik.errors.email}</div>)
                            ||
                            ((formik.errors.password && formik.touched.password) && <div className={styles.error}>{formik.errors.password}</div>)
                        }
                        <Button className={styles.btn } disabled={!formik.isValid} secondary type='submit'>{isLogin ? 'Boйти' : 'Регистрация'}</Button>
                    </div>
                </form>
            </div>
        </Container>
    ) 
    
})

export default Auth