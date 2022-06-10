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

const CreateTypeForm = observer(({submittedHandler}) => {
    const {toast, type} = useContext(Context)
    const [error, setError] = useState(null)
    const validationSchema = Yup.object({
        name: Yup.string().required('Укажите название типа')
    })
    const onSubmit = async (values, {resetForm, ...rest}) => {
        try {
            if(error) setError(null)
            type.setIsFetchingType(true)
            await createType(values)
            resetForm()
            toast.addToast(createToast(`Тип ${values.name} успешно создан!`))
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
                    (type.isFetchingType && <div className='form__spinnerContainer'><SpinnerFacebook className='form__spinner'/></div>)
                    ||
                    (formik.errors.name && <ErrorMessage message={formik.errors.name}/>)
                    ||
                    (error && <ErrorMessage message={error}/>)
                }
                <Button className='form__btn' disabled={!formik.isValid || type.isFetchingType} type='submit' secondary>Добавить</Button>
            </div>   
        </form>
    )
})

export default CreateTypeForm