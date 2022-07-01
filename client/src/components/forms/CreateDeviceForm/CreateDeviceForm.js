import React, { useContext, useEffect, useState } from 'react'
import { observer } from 'mobx-react-lite'
import { useFormik, FieldArray, FormikProvider } from 'formik'
import * as Yup from 'yup'
import { useTranslation } from 'react-i18next'

import { createDevice, fetchBrands, fetchTypes } from '../../../http/deviceAPI'
import { MAX_PRICE } from '../../../utils/consts'
import { Context } from '../../../index'
import SpinnerFacebook from '../../UI/spinners/SpinnerFacebook/SpinnerFacebook'
import Button from '../../UI/Button/Button'
import ErrorMessage from '../ErrorMessage'
import CustomSelect from '../../UI/CustomSelect/CustomSelect'
import { createToast } from '../../UI/Toast/Toast'

import { RiDeleteBin6Fill } from 'react-icons/ri'
import styles from './CreateDeviceForm.module.scss'


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
    const i18n = useTranslation()
    const [error, setError] = useState(null)
    // список для select типов устройств
    const optionsType = type.types.map(t => ({value: t, label: i18n.t(t.name)}))
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
            toast.addToast(createToast(i18n.t('Device added', {name})))
        }).catch(e => {
            console.error('Error in CreateDeviceForm:' , e.massage)
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
        type: Yup.object().required('Choose device type'),
        brand: Yup.object().required('Choose device brand'),
        name: Yup.string().required('Enter name device'),
        price: Yup.number().nullable(true).min(1, 'Cost must be more than zero').required('Enter price'),
        img: Yup.mixed().required('Add device image'),
        info: Yup.array().of(
            Yup.object().shape({
                title: Yup.string().required('Enter property name'),
                description: Yup.string().required('Enter property description'),
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
                    <label className='form__label' htmlFor="type">{i18n.t('Type')}</label>
                    <CustomSelect 
                        options={optionsType}
                        value={formik.values.type}
                        onChange={value => formik.setFieldValue('type', value.value)}
                        placeholder={i18n.t('Choose device type...')}
                    />
                </div>

                <div className={`form__field ${styles.field}`}>
                    <label className='form__label' htmlFor="brand">{i18n.t('Brand')}</label>
                    <CustomSelect 
                        options={optionsBrand}
                        value={formik.values.brand}
                        onChange={value => formik.setFieldValue('brand', value.value)}
                        placeholder={i18n.t('Choose device brand...')}
                    />
                </div>

                <div className={`form__field ${styles.field}`}>
                    <label className='form__label' htmlFor='name'>{i18n.t('Name Device')}</label>
                    <input 
                        className='form__input'
                        id='name'
                        type='text' 
                        {...formik.getFieldProps('name')}
                        placeholder={i18n.t('Enter name device...')}
                    />
                </div>
                
                <div className={`form__field ${styles.field}`}>
                    <label className='form__label' htmlFor='price'>{i18n.t('Price rub.')}</label>
                    <input 
                        className='form__input'
                        id='price'
                        type='number'
                        min={1}
                        max={MAX_PRICE}
                        {...formik.getFieldProps('price')}
                        onKeyPress={priceOnKeyPressHandler}
                        onChange={priceOnInputHandler}
                        placeholder={i18n.t('Enter price...')}
                    />
                </div>
            
                <div className={`form__field ${styles.field}`}>
                    <label className='form__label' htmlFor='img'>{i18n.t('Image')}</label>
                    <label htmlFor='img' className={`btn`}>            
                       {i18n.t('Upload image')}
                    </label>
                    <input 
                        id='img'
                        name='img'
                        type='file' 
                        onChange={(event) => {formik.setFieldValue('img', event.currentTarget.files[0])}}
                        hidden
                        multiple
                    />
                    <span className={styles.fileName}>{formik.values.img && formik.values.img?.name}</span>
                </div> 

                <div className={`form__field ${styles.field}`}>
                    <div className='form__label'>{i18n.t('Properties')}</div>
                    <FormikProvider value={formik}>
                        <FieldArray 
                            name='info'
                            render={arrayHelpers => (
                                <div className={styles.info}>
                                    {formik.values.info.map((item, index) => (
                                        <div key={index} className={styles.info__row}>
                                            <div className={styles.info__item}>
                                                <input 
                                                    className={`form__input ${styles.info__input}`}
                                                    type='text'
                                                    name={`info[${index}].title`}
                                                    value={formik.values.info[index].title}
                                                    onChange={formik.handleChange}
                                                    placeholder={i18n.t('Enter name...')}
                                                />
                                            </div>
                                            <div className={styles.info__item}>
                                                <input
                                                    className={`form__input ${styles.info__input}`}
                                                    type='text'
                                                    name={`info.${index}.description`}
                                                    value={formik.values.info[index].description}
                                                    onChange={formik.handleChange}
                                                    placeholder={i18n.t('Enter description...')}
                                                />
                                            </div>
                                            <div className={styles.info__remove} onClick={() => {arrayHelpers.remove(index)}}><RiDeleteBin6Fill className={styles.info__icon}/></div>
                                        </div>
                                    ))}
                                    <button type='button' onClick={() => arrayHelpers.push({title: '', description: ''})} className={`btn ${styles.addInfo}`}>{i18n.t('Add new property')}</button>
                                </div>
                            )}
                        /> 
                    </FormikProvider>
                </div>

                <div className='form__footer'>
                    {
                        (brand.isFetchingBrand && <div className='form__spinnerContainer'><SpinnerFacebook className='form__spinner'/></div>)
                        ||
                        (messageError && <ErrorMessage message={i18n.t(messageError)}/>)
                        ||
                        (error && <ErrorMessage message={i18n.t(error)}/>)
                    }
                    <Button className={`form__btn ${styles.btnAdd}`} type='submit' disabled={!formik.isValid} secondary>{i18n.t('Add')}</Button>
                </div>
            </form>
    )
})

export default CreateDeviceForm