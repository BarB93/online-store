import React from 'react'
import { Field, Form, Formik } from 'formik'
import * as Yup from 'yup'

import Button from '../UI/Button/Button'
import ErrorMessage from './ErrorMessage'
import { createType } from '../../http/deviceAPI'

const CreateTypeForm = () => {
    const validationSchema = Yup.object({
        name: Yup.string().required('Укажите название типа')
    })

    return (
        <Formik
            initialValues={{name: ''}}
            validationSchema={validationSchema}
            onSubmit={values => {
                createType(values).then(data => console.log(data))
            }}
        >
            {({isValid, errors}) => (
                <Form>
                    <label className='form__label' htmlFor='name'>Название</label>
                    <Field className='form__input' name='name' type='text' />
                    <div className='form__footer'>
                        {errors.name && <ErrorMessage message={errors.name}/>}
                        <Button className='form__btn' disabled={!isValid} type='submit' secondary>Добавить</Button>
                    </div>
                </Form>
            )}
        </Formik>
    )
}

export default CreateTypeForm