import React, { useContext, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { observer } from 'mobx-react-lite'
import { useFormik } from 'formik'
import * as Yup from 'yup'

import { Context } from '../../index'
import { login, registration } from '../../http/userAPI'
import { LOGIN_ROUTE,  SHOP_ROUTE } from '../../utils/consts'
import Button from '../UI/Button/Button'
import SpinnerFacebook from '../UI/spinners/SpinnerFacebook/SpinnerFacebook'
import ErrorMessage from './ErrorMessage'

const AuthForm = observer(() => {
    const [error, setError] = useState(null)
    const {user} = useContext(Context)
    const location = useLocation()
    const navigate = useNavigate()
    const isLogin = location.pathname === LOGIN_ROUTE

    const authHandler = async (email, password) => {
        try {
            user.setIsFetchingAuth(true)
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
        } 
        catch (e) {setError(e.response.data.message)}
        finally {user.setIsFetchingAuth(false)}
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
    })

    return (
        <form onSubmit={formik.handleSubmit} onChange={() => setError(null)}>
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

            <div className={`form__footer`}>
                {   
                    
                    (user.isFetchingAuth && <div className='form__spinnerContainer'><SpinnerFacebook className='form__spinner'/></div>)
                    ||
                    (error && <ErrorMessage message={error} />)
                    ||
                    ((formik.errors.email && formik.touched.email) && <ErrorMessage message={formik.errors.email} />)
                    ||
                    ((formik.errors.password && formik.touched.password) && <ErrorMessage message={formik.errors.password} />)
                }
                <Button className='form__btn' disabled={!formik.isValid || user.isFetchingAuth} secondary type='submit'>{isLogin ? 'Boйти' : 'Регистрация'}</Button>
            </div>
        </form>
    )
})

export default AuthForm