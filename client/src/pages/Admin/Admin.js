import React, { useState } from 'react'

import Button from '../../components/UI/Button/Button'
import Container from '../../components/UI/Container/Container'
import Modal from '../../components/UI/Modal/Modal'
import CreateTypeForm from '../../components/forms/CreateTypeForm'
import CreateBrandForm from '../../components/forms/CreateBrandForm'
import CreateDeviceForm from '../../components/forms/CreateDeviceForm/CreateDeviceForm'

import styles from './Admin.module.scss'

const Admin = () => {
    const [typeModal, setTypeModal] = useState(false)
    const [brandModal, setBrandModal] = useState(false)
    const [deviceModal, setDeviceModal] = useState(false)

    const openTypeModal = () => {
        setTypeModal(true)
    }
    const openBrandModal = () => {
        setBrandModal(true)
    }
    const openDeviceModal = () => {
        setDeviceModal(true)
    }

    const titleType = 'Добавить тип'
    const titleBrand = 'Добавить бренд'
    const titleDevice = 'Добавить устройство'

    return (
        <Container>
            <div className={styles.container}>
                <div className={styles.buttons}>
                    <Button className={styles.btn} onClick={openTypeModal}>{titleType}</Button>
                    <Button className={styles.btn} onClick={openBrandModal}>{titleBrand}</Button>
                    <Button className={styles.btn} onClick={openDeviceModal}>{titleDevice}</Button>
                </div>
            </div>

            <Modal active={typeModal} setActive={setTypeModal} title={titleType}><CreateTypeForm /></Modal>
            <Modal active={brandModal} setActive={setBrandModal} title={titleBrand}><CreateBrandForm /></Modal>
            <Modal active={deviceModal} setActive={setDeviceModal} title={titleDevice}><CreateDeviceForm /></Modal>
        </Container>
    )
}

export default Admin