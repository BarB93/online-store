import React from 'react'
import { Field, Form, Formik } from 'formik'

import Button from '../UI/Button/Button'

const CreateBrand = () => {
    return (
        <Formik
            initialValues={{name: '',}}
        >
            <Form>
                <label className='form__label' htmlFor='name'>Название</label>
                <Field name='name' type='text' />
                <div className='form__footer'>
                    <Button secondary>Добавить</Button>
                </div>
            </Form>
        </Formik>
    )
}

export default CreateBrand