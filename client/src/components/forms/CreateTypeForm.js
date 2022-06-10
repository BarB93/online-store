import React, { useContext, useState } from 'react'
import { observer } from 'mobx-react-lite'
import { Field, Form, Formik } from 'formik'
import * as Yup from 'yup'

import { Context } from '../..'
import { createToast } from '../UI/Toast/Toast'
import { createType } from '../../http/deviceAPI'
import SpinnerFacebook from '../UI/spinners/SpinnerFacebook/SpinnerFacebook'
import Button from '../UI/Button/Button'
import ErrorMessage from './ErrorMessage'

const CreateTypeForm = observer(({submittedHandler}) => {
    const {toast, type} = useContext(Context)
    const [error, setError] = useState(null)
    const validationSchema = Yup.object({
        name: Yup.string().required('Укажите название типа')
    })

    return (
        <Formik
            initialValues={{name: ''}}
            validationSchema={validationSchema}
            onSubmit={(values, {resetForm}) => {
                type.setIsFetchingType(true)
                createType(values).then(data => {
                    if(error) setError(null)
                    resetForm()
                    toast.addToast(createToast(`Тип ${values.name} успешно создан!`))
                    if(typeof submittedHandler === 'function') {
                        submittedHandler()
                    }
                }).catch((e) => {
                    setError(e.response.data.message)
                }).finally(() => type.setIsFetchingType(false))
            }}
        >
            {({isValid, errors}) => (
                <Form onChange={() => setError(null)}>
                    <label className='form__label' htmlFor='name'>Название</label>
                    <Field className='form__input' name='name' type='text' />
                    <div className='form__footer'>
                        {
                            (type.isFetchingType && <div className='form__spinnerContainer'><SpinnerFacebook className='form__spinner'/></div>)
                            ||
                            (errors.name && <ErrorMessage message={errors.name}/>)
                            ||
                            (error && <ErrorMessage message={error}/>)
                        }
                        <Button className='form__btn' disabled={!isValid || type.isFetchingType} type='submit' secondary>Добавить</Button>
                    </div>
                </Form>
            )}
        </Formik>
    )
})

export default CreateTypeForm