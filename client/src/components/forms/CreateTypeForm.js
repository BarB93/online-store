import React, { useState } from 'react'
import { Field, Form, Formik } from 'formik'
import * as Yup from 'yup'

import Button from '../UI/Button/Button'
import ErrorMessage from './ErrorMessage'
import { createType } from '../../http/deviceAPI'

const CreateTypeForm = ({submittedHandler}) => {
    const [error, setError] = useState(null)
    const validationSchema = Yup.object({
        name: Yup.string().required('Укажите название типа')
    })

    return (
        <Formik
            initialValues={{name: ''}}
            validationSchema={validationSchema}
            onSubmit={(values, {resetForm}) => {
                createType(values).then(data => {
                    if(error) setError(null)
                    resetForm()
                    if(typeof submittedHandler === 'function') {
                        submittedHandler()
                    }
                }).catch((e) => {
                    setError(e.response.data.message)
                }) 
            }}
        >
            {({isValid, errors}) => (
                <Form onChange={() => setError(null)}>
                    <label className='form__label' htmlFor='name'>Название</label>
                    <Field className='form__input' name='name' type='text' />
                    <div className='form__footer'>
                        {errors.name && <ErrorMessage message={errors.name}/>}
                        {error && <ErrorMessage message={error}/>}
                        <Button className='form__btn' disabled={!isValid} type='submit' secondary>Добавить</Button>
                    </div>
                </Form>
            )}
        </Formik>
    )
}

export default CreateTypeForm