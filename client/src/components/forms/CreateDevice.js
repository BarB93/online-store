import React, { useContext } from 'react'
import { useFormik } from 'formik'

import { Context } from '../../index'
import Button from '../UI/Button/Button'
import CustomSelect from '../UI/CustomSelect'

const CreateDevice = () => {
    const {device} = useContext(Context)
    const optionsType = device.types.map(type => ({value: type, label: type.name}))

    const formik = useFormik({
        initialValues: {
            type: '',
            brand: '',
            name: '',
            price: 0,
            img: '',
        }, 
        onSubmit: value => console.log(value),
    })

    return (
        <form>
            <div className='form__field'>
                <label className='form__label' htmlFor="">Tип</label>
                <CustomSelect 
                    options={optionsType}
                    value={formik.values.type}
                    onChange={value => formik.setFieldValue('type', value.value)}
                />
            </div>

            <div className='form__field'>
                <label className='form__label' htmlFor='name'>Название</label>
                <input 
                    className='form__input'
                    id='name'
                    name='name' 
                    type='text' 
                    {...formik.getFieldProps('name')}
                />
            </div>
            {/* 
            <div className='form__field'>
                <label className='form__label' htmlFor='price'>Цена</label>
                <Field name='price' type='number' />
            </div>

            <div className='form__field'>
                <label className='form__label' htmlFor='img'>URL Картинки</label>
                <Field name='img' type='text' />
            </div> */}

            <div className='form__footer'>
                <Button secondary>Добавить</Button>
            </div>
            
        </form>
    )
}

export default CreateDevice