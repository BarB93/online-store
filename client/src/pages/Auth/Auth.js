import React from 'react'
import {Formik, Form, Field, ErrorMessage} from 'formik'
import * as Yup from 'yup'

import styles from './Auth.module.scss'
import Button from '../../components/Button/Button';

const Auth = () => {
    return (
        <div className={'container ' + styles.container}> 
            <div className={styles.box}>
                <h2 className={styles.header}>Авторизация</h2>
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
                        <label htmlFor='email'>Email</label>
                        <Field name='email' type='text' />
                        <ErrorMessage className='error-message' name='email' component="div" />
                
                        <label htmlFor='password'>Пароль</label>
                        <Field name='password' type='password' />
                        <ErrorMessage className='error-message' name='password' component="div" />
    
                        <Button className={styles.btn} secondary type='submit'>Boйти</Button>
                    </Form>
                </Formik>
            </div>
        </div>
    ) 
    
}

export default Auth