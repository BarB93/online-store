import React, { useContext, useEffect, useState } from 'react'
import { observer } from 'mobx-react-lite'
import { useFormik, FieldArray, FormikProvider } from 'formik'
import * as Yup from 'yup'

import { createDevice, fetchBrands, fetchTypes } from '../../../http/deviceAPI'
import { MAX_PRICE } from '../../../utils/consts'
import { Context } from '../../../index'
import SpinnerFacebook from '../../UI/spinners/SpinnerFacebook/SpinnerFacebook'
import Button from '../../UI/Button/Button'
import ErrorMessage from '../ErrorMessage'
import CustomSelect from '../../UI/CustomSelect/CustomSelect'

import styles from './CreateDeviceForm.module.scss'
import { createToast } from '../../UI/Toast/Toast'


function getErrorMessage(formik) {
    if(formik.errors.type && !formik.isValid) return formik.errors.type
    if(formik.errors.brand && !formik.isValid) return formik.errors.brand
    if(formik.errors.name && !formik.isValid) return formik.errors.name
    if(formik.errors.price && !formik.isValid) return formik.errors.price
    if(formik.errors.img && !formik.isValid) return formik.errors.img
    if(formik.errors.info && !formik.isValid) return 'Заполните все поля у свойства или удалите его нажав на крестик'

    return null
}

const CreateDeviceForm = observer(({submittedHandler}) => {
    const {type, brand, toast} = useContext(Context)
    const [error, setError] = useState(null)
    // список для select типов устройств
    const optionsType = type.types.map(t => ({value: t, label: t.name}))
    // список для select брендов устройств
    const optionsBrand = brand.brands.map(b => ({value: b, label: b.name}))

    const addDevice = ({name, price, brand, type, info, img}) => {
        const formData = new FormData()
        formData.append('name', name)
        formData.append('price', `${price}`)
        formData.append('img', img)
        formData.append('brandId', brand.id)
        formData.append('typeId', type.id)
        formData.append('info', JSON.stringify(info))
        createDevice(formData).then(data => {
            if(typeof submittedHandler === 'function') submittedHandler()
            toast.addToast(createToast(`Девайс ${name} успешно создан!`))
        }).catch(e => {
            console.log(e)
        })
    }

    useEffect(() => {
        // fetch Types
        type.setIsLoadingTypes(true)
        fetchTypes().then(data => {type.setTypes(data)})
        .catch(e => alert(e.massage))
        .finally(() => type.setIsLoadingTypes(false))
        
        // fetch Brands
        brand.setIsLoadingBrands(true)
        fetchBrands().then(data => brand.setBrands(data))
        .catch(e => alert(e.massage))
        .finally(() => brand.setIsLoadingBrands(false)) 
    }, [])

    const validationSchema = Yup.object({
        type: Yup.object().required('Укажите тип девайса'),
        brand: Yup.object().required('Укажите бренд девайса'),
        name: Yup.string().required('Укажите название девайса'),
        price: Yup.number().nullable(true).min(1, 'Стоимость должна быть больше нуля').required('Укажите стоимость девайса'),
        img: Yup.mixed().required('Прикрепите фото девайса'),
        info: Yup.array().of(
            Yup.object().shape({
                title: Yup.string().required('Укажите название свойства'),
                description: Yup.string().required('Укажите описание свойства'),
            })
        )
    })

    const formik = useFormik({
        initialValues: {
            type: '',
            brand: '',
            name: '',
            price: null,
            img: null,
            info: []
        },
        validationSchema,
        onSubmit: values => addDevice(values),
    })

    const messageError = getErrorMessage(formik)
   
    const priceOnKeyPressHandler = e => {
        const arrayKey = ['e', '-', '+', '.']
        if(arrayKey.includes(e.key)) {
            e.preventDefault()
        }
    }
    const priceOnInputHandler = e => {
        const regexp = /^0+/gu
        const value = e.target.value

        if(value.match(regexp)) {
            const newValue = value.replace(regexp, '')
            formik.setFieldValue('price', newValue)
        }else if(value > MAX_PRICE) {
            formik.setFieldValue('price', value.slice(0,-1))
        }
        else {
            formik.setFieldValue('price', value)
        }
    }
    
    return (
            <form onSubmit={formik.handleSubmit} onChange={() => setError(null)}>
                <div className={`form__field ${styles.field}`}>
                    <label className='form__label' htmlFor="type">Tип</label>
                    <CustomSelect 
                        options={optionsType}
                        value={formik.values.type}
                        onChange={value => formik.setFieldValue('type', value.value)}
                        placeholder='Выберите тип устройства...'
                    />
                </div>

                <div className={`form__field ${styles.field}`}>
                    <label className='form__label' htmlFor="brand">Бренд</label>
                    <CustomSelect 
                        options={optionsBrand}
                        value={formik.values.brand}
                        onChange={value => formik.setFieldValue('brand', value.value)}
                        placeholder='Выберите бренд устройства...'
                    />
                </div>

                <div className={`form__field ${styles.field}`}>
                    <label className='form__label' htmlFor='name'>Название</label>
                    <input 
                        className='form__input'
                        id='name'
                        type='text' 
                        {...formik.getFieldProps('name')}
                        placeholder='Выберите название устройства...'
                    />
                </div>
                
                <div className={`form__field ${styles.field}`}>
                    <label className='form__label' htmlFor='price'>Цена руб.</label>
                    <input 
                        className='form__input'
                        id='price'
                        type='number'
                        min={1}
                        max={MAX_PRICE}
                        {...formik.getFieldProps('price')}
                        onKeyPress={priceOnKeyPressHandler}
                        onChange={priceOnInputHandler}
                        placeholder='Укажите стоимость устройства...'
                    />
                </div>
            
                <div className={`form__field ${styles.field}`}>
                    <label className='form__label' htmlFor='img'>Картинка</label>
                    <label htmlFor='img' className={`btn`}>            
                        Загрузить картинку 
                    </label>
                    <input 
                        id='img'
                        name='img'
                        type='file' 
                        placeholder='Выберите картинку устройства...'
                        onChange={(event) => {formik.setFieldValue('img', event.currentTarget.files[0])}}
                        hidden
                        multiple
                    />
                    <span className={styles.fileName}>{formik.values.img && formik.values.img?.name}</span>
                </div> 

                <div className={`form__field ${styles.field}`}>
                    <div className='form__label'>Свойства</div>
                    <FormikProvider value={formik}>
                        <FieldArray 
                            name='info'
                            render={arrayHelpers => (
                                <div className={styles.info}>
                                    {formik.values.info.map((item, index) => (
                                        <div key={index} className={styles.info__row}>
                                            <div className={styles.info__remove} onClick={() => {arrayHelpers.remove(index)}}></div>
                                            <input 
                                                className='form__input'
                                                type='text'
                                                name={`info[${index}].title`}
                                                value={formik.values.info[index].title}
                                                onChange={formik.handleChange}
                                                placeholder='Введите название свойства...'
                                            />
                                            <textarea
                                                className={`form__input ${styles.textarea}`}
                                                name={`info.${index}.description`}
                                                value={formik.values.info[index].description}
                                                onChange={formik.handleChange}
                                                placeholder='Введите описание свойства...'
                                            />
                                        </div>
                                    ))}
                                    <button type='button' onClick={() => arrayHelpers.push({title: '', description: ''})} className={`btn ${styles.addInfo}`}>Добавить новое свойство</button>
                                </div>
                            )}
                        /> 
                    </FormikProvider>
                </div>

                <div className='form__footer'>
                    {
                        (brand.isFetchingBrand && <div className='form__spinnerContainer'><SpinnerFacebook className='form__spinner'/></div>)
                        ||
                        (messageError && <ErrorMessage message={messageError}/>)
                        ||
                        (error && <ErrorMessage message={error}/>)
                    }
                    <Button className='form__btn' type='submit' disabled={!formik.isValid} secondary>Добавить</Button>
                </div>
            </form>
    )
})

export default CreateDeviceForm