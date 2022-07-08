import React, { useContext, useState } from 'react'
import { observer } from 'mobx-react-lite'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { useTranslation } from 'react-i18next'

import deviceAPI from '../../http/deviceAPI'
import { Context } from '../..'
import { createToast } from '../UI/Toast/Toast'
import SpinnerFacebook from '../UI/spinners/SpinnerFacebook/SpinnerFacebook'
import Button from '../UI/Button/Button'
import ErrorMessage from './ErrorMessage'

const CreateBrandForm = observer(({submittedHandler}) => {
    const i18n = useTranslation()
    const {toast, brand} = useContext(Context)
    const [error, setError] = useState(null)
    const validationSchema = Yup.object({
        name: Yup.string().required(i18n.t('Enter brand name'))
    })
    const onSubmit = async (values, {resetForm, ...rest}) => {
        try {
            if(error) setError(null)
            brand.setIsFetchingBrand(true)
            await deviceAPI.createBrand(values)
            resetForm()
            toast.addToast(createToast(i18n.t('Brand created successfully', {name: values.name})))
            if(typeof submittedHandler === 'function') {
                submittedHandler()
            }
        } catch(e) {
            setError(e.response.data.message)
        } finally {
            brand.setIsFetchingBrand(false)
        }
    }

    const formik = useFormik({
        initialValues:{name: ''},
        validationSchema,
        onSubmit
    })

    return (
        <form onSubmit={formik.handleSubmit} onChange={() => setError(null)}>   
            <label className='form__label' htmlFor='name'>{i18n.t('Name of brand')}</label>
            <input 
                className='form__input'
                id="name"
                type='text'
                placeholder={i18n.t('Enter brand name...')}
                {...formik.getFieldProps('name')}
            />
            <div className='form__footer'>
                {
                    (brand.isFetchingBrand && <div className='form__spinnerContainer'><SpinnerFacebook className='form__spinner'/></div>)
                    ||
                    (formik.errors.name && <ErrorMessage message={i18n.t(formik.errors.name)}/>)
                    ||
                    (error && <ErrorMessage message={i18n.t(error)}/>)
                }
                <Button className='form__btn' disabled={!formik.isValid || brand.isFetchingBrand} type='submit' secondary>{i18n.t('Add')}</Button>
            </div>   
        </form>
    )
})

export default CreateBrandForm