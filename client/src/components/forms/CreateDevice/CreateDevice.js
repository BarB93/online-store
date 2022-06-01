import React, { useContext, useState } from 'react'
import { useFormik } from 'formik'

import { Context } from '../../../index'
import Button from '../../UI/Button/Button'
import CustomSelect from '../../UI/CustomSelect'

import styles from './CreateDevice.module.scss'

const CreateDevice = () => {
    const {device} = useContext(Context)
    // список для select типов устройств
    const optionsType = device.types.map(type => ({value: type, label: type.name}))
    // список для select брендов устройств
    const optionsBrand = device.brands.map(brand => ({value: brand, label: brand.name}))
    // массив характериститк для девайса
    const [info, setInfo] = useState([])

    // handlers
    const addInfo = () => setInfo([...info, {title: '', description: '', number: Date.now()}])
    const removeInfo = (number) => setInfo(info.map(i => i.number !== number))

    const formik = useFormik({
        initialValues: {
            type: '',
            brand: '',
            name: '',
            price: 0,
            img: null,
        }, 
        // onSubmit: value => console.log(value),
        onSubmit: values => console.log({
            fileName: values.img.name, 
              type: values.img.type,
              size: `${values.img.size} bytes`
        }),
    })

    return (
        <form onSubmit={formik.handleSubmit}>
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
                    id='name'
                    type='text' 
                    {...formik.getFieldProps('name')}
                    className='form__input'
                    placeholder='Выберите название устройства...'
                />
            </div>
             
            <div className={`form__field ${styles.field}`}>
                <label className='form__label' htmlFor='price'>Цена руб.</label>
                <input 
                    id='price'
                    type='number'
                    min={0}
                    {...formik.getFieldProps('price')}
                    className='form__input'
                    placeholder='Выберите стоимость устройства...'
                />
            </div>
           
            <div className={`form__field ${styles.field}`}>
                <label className='form__label' htmlFor='img'>Картинка</label>
                <label htmlFor='img' className={`btn`}>            
                    Загрузить кртинку 
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
                <div className={styles.info}>
                    <div className={styles.info__row}>
                        <input 
                            className='form__input'
                            type='text' 
                            placeholder='Введите название...'
                        />
                        <textarea 
                            className={`form__input ${styles.textarea}`}
                            type='text' 
                            placeholder='Введите описание...'
                        />
                    </div>
                    <div className={styles.info__row}>
                        <input 
                            className='form__input'
                            type='text' 
                            placeholder='Введите название...'
                        />
                        <textarea 
                            className={`form__input ${styles.textarea}`}
                            type='text' 
                            placeholder='Введите описание...'
                        />
                    </div>
                    {info.map(i => {
                        return  (
                            <div key={i.number} className={styles.info__row}>
                                <input 
                                    className='form__input'
                                    type='text' 
                                    placeholder='Введите название...'
                                />
                                <textarea 
                                    className={`form__input ${styles.textarea}`}
                                    type='text' 
                                    placeholder='Введите описание...'
                                />
                            </div>
                        )
                    })}
                </div>
                <buttton type='button' onClick={addInfo} className='btn'>Добавить новое свойство</buttton> 
            </div>

            <div className='form__footer'>
                <Button secondary>Добавить</Button>
            </div>
            
        </form>
    )
}

export default CreateDevice