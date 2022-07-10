import React, { useContext, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { observer } from 'mobx-react-lite'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { useTranslation } from 'react-i18next'

import userAPI from '../../http/userAPI'
import { Context } from '../../index'
import { LOGIN_ROUTE,  SHOP_ROUTE } from '../../utils/consts'
import Button from '../UI/Button/Button'
import SpinnerFacebook from '../UI/spinners/SpinnerFacebook/SpinnerFacebook'
import ErrorMessage from './ErrorMessage'

const AuthForm = observer(() => {
    const [error, setError] = useState(null)
    const {user} = useContext(Context)
    const location = useLocation()
    const navigate = useNavigate()
    const i18n = useTranslation()
    const isLogin = location.pathname === LOGIN_ROUTE

    const authHandler = async (email, password) => {
        try {
            user.setIsFetchingAuth(true)
            let data
            if(error) setError(null)
            if(isLogin) {
                data  = await userAPI.login(email, password)
            } else {
                data = await userAPI.registration(email, password)
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
            email: Yup.string().email('Incorrect email').required('Required Email'),
            password: Yup.string().required('Required Password')
                .min(3, 'Password must have min 3 symbols')
                .max(20, 'Password must have max 20 symbols')
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
                    placeholder={i18n.t('Enter email...')}       
                />
               
            </div>
        
            <div className='form__field'>
                <label className='form__label' htmlFor='password'>{i18n.t('Password')}</label>
                <input 
                    className='form__input'
                    id='password'
                    type='password'
                    {...formik.getFieldProps('password')}
                    placeholder={i18n.t('Enter password...')} 
                />      
            </div>

            <div className={`form__footer`}>
                {   
                    
                    (user.isFetchingAuth && <div className='form__spinnerContainer'><SpinnerFacebook className='form__spinner'/></div>)
                    ||
                    (error && <ErrorMessage message={i18n.t(error)} />)
                    ||
                    ((formik.errors.email && formik.touched.email) && <ErrorMessage message={i18n.t(formik.errors.email)} />)
                    ||
                    ((formik.errors.password && formik.touched.password) && <ErrorMessage message={i18n.t(formik.errors.password)} />)
                }
                <Button className='form__btn' disabled={!formik.isValid || user.isFetchingAuth} secondary type='submit'>{isLogin ? i18n.t('Sign in') : i18n.t('Sign up')}</Button>
            </div>
        </form>
    )
})

export default AuthForm