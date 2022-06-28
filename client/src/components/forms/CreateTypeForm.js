import React, { useContext, useState } from 'react'
import { observer } from 'mobx-react-lite'
import { useFormik } from 'formik'
import * as Yup from 'yup'

import { Context } from '../..'
import { createToast } from '../UI/Toast/Toast'
import { createType } from '../../http/deviceAPI'
import SpinnerFacebook from '../UI/spinners/SpinnerFacebook/SpinnerFacebook'
import Button from '../UI/Button/Button'
import ErrorMessage from './ErrorMessage'
import { useTranslation } from 'react-i18next';

const CreateTypeForm = observer(({submittedHandler}) => {
    const i18n = useTranslation()
    const {toast, type} = useContext(Context)
    const [error, setError] = useState(null)
    const validationSchema = Yup.object({
        name: Yup.string().required(i18n.t('Enter type name'))
    })
    const onSubmit = async (values, {resetForm, ...rest}) => {
        try {
            if(error) setError(null)
            type.setIsFetchingType(true)
            await createType(values)
            resetForm()
            toast.addToast(createToast(i18n.t('Type created successfully'), {name: values.name}))
            if(typeof submittedHandler === 'function') {
                submittedHandler()
            }
        } catch(e) {
            setError(e.response.data.message)
        } finally {
            type.setIsFetchingType(false)
        }
    }

    const formik = useFormik({
        initialValues:{name: ''},
        validationSchema,
        onSubmit
    })

    return (
        <form onSubmit={formik.handleSubmit} onChange={() => setError(null)}>   
            <label className='form__label' htmlFor='name'>{i18n.t('Name of type')}</label>
            <input 
                className='form__input'
                id="name"
                type='text'
                placeholder={i18n.t('Enter type name...')}
                {...formik.getFieldProps('name')}
            />
            <div className='form__footer'>
                {
                    (type.isFetchingType && <div className='form__spinnerContainer'><SpinnerFacebook className='form__spinner'/></div>)
                    ||
                    (formik.errors.name && <ErrorMessage message={i18n.t(formik.errors.name)}/>)
                    ||
                    (error && <ErrorMessage message={i18n.t(error)}/>)
                }
                <Button className='form__btn' disabled={!formik.isValid || type.isFetchingType} type='submit' secondary>{i18n.t('Add')}</Button>
            </div>   
        </form>
    )
})

export default CreateTypeForm