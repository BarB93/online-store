import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'

import Button from '../../components/UI/Button/Button'
import Container from '../../components/UI/Container/Container'
import Modal from '../../components/UI/Modal/Modal'
import CreateTypeForm from '../../components/forms/CreateTypeForm'
import CreateBrandForm from '../../components/forms/CreateBrandForm'
import CreateDeviceForm from '../../components/forms/CreateDeviceForm/CreateDeviceForm'

import styles from './Admin.module.scss'

const Admin = () => {
    const i18n = useTranslation()
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

    const typeSubmittedHandler = () => {
        setTypeModal(false)
    }
    const brandSubmittedHandler = () => {
        setBrandModal(false)
    }
    const deviceSubmittedHandler = () => {
        setDeviceModal(false)
    }

    const titleType = i18n.t('Add type')
    const titleBrand = i18n.t('Add brand')
    const titleDevice = i18n.t('Add device')

    return (
        <Container>
            <div className={styles.container}>
                <div className={styles.buttons}>
                    <Button className={styles.btn} onClick={openTypeModal}>{titleType}</Button>
                    <Button className={styles.btn} onClick={openBrandModal}>{titleBrand}</Button>
                    <Button className={styles.btn} onClick={openDeviceModal}>{titleDevice}</Button>
                </div>
            </div>

            <Modal active={typeModal} setActive={setTypeModal} title={titleType}><CreateTypeForm submittedHandler={typeSubmittedHandler}/></Modal>
            <Modal active={brandModal} setActive={setBrandModal} title={titleBrand}><CreateBrandForm submittedHandler={brandSubmittedHandler}/></Modal>
            <Modal active={deviceModal} setActive={setDeviceModal} title={titleDevice}><CreateDeviceForm submittedHandler={deviceSubmittedHandler}/></Modal>
        </Container>
    )
}

export default Admin