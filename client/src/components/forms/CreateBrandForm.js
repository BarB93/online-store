import React, { useContext, useState } from 'react'
import { observer } from 'mobx-react-lite'
import { useFormik } from 'formik'
import * as Yup from 'yup'

import { Context } from '../..'
import { createToast } from '../UI/Toast/Toast'
import { createBrand } from '../../http/deviceAPI'
import SpinnerFacebook from '../UI/spinners/SpinnerFacebook/SpinnerFacebook'
import Button from '../UI/Button/Button'
import ErrorMessage from './ErrorMessage'

const CreateBrandForm = observer(({submittedHandler}) => {
    const {toast, brand} = useContext(Context)
    const [error, setError] = useState(null)
    const validationSchema = Yup.object({
        name: Yup.string().required('Укажите название бренда')
    })
    const onSubmit = async (values, {resetForm, ...rest}) => {
        try {
            if(error) setError(null)
            brand.setIsFetchingBrand(true)
            await createBrand(values)
            resetForm()
            toast.addToast(createToast(`Бренд ${values.name} успешно создан!`))
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
            <label className='form__label' htmlFor='name'>Название</label>
            <input 
                className='form__input'
                id="name"
                type='text'
                placeholder='Введите название типа...'
                {...formik.getFieldProps('name')}
            />
            <div className='form__footer'>
                {
                    (brand.isFetchingBrand && <div className='form__spinnerContainer'><SpinnerFacebook className='form__spinner'/></div>)
                    ||
                    (formik.errors.name && <ErrorMessage message={formik.errors.name}/>)
                    ||
                    (error && <ErrorMessage message={error}/>)
                }
                <Button className='form__btn' disabled={!formik.isValid || brand.isFetchingBrand} type='submit' secondary>Добавить</Button>
            </div>   
        </form>
    )
})

export default CreateBrandForm