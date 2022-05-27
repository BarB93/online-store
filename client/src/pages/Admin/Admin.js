import React, { useState } from 'react'

import Button from '../../components/UI/Button/Button'
import Container from '../../components/UI/Container/Container'
import Modal from '../../components/UI/Modal/Modal'

import styles from './Admin.module.scss'

const Admin = () => {
    const [typeModal, setTypeModal] = useState(false)
    const [brandModal, setBrandModal] = useState(false)
    const [deviceModal, setDeviceModal] = useState(false)

    const toggleTypeModal = () => {
        setTypeModal(prev => !prev)
    }
    const toggleBrandModal = () => {
        setBrandModal(prev => !prev)
    }
    const toggleDeviceModal = () => {
        setDeviceModal(prev => !prev)
    }

    return (
        <Container>
            <div className={styles.container}>
                <div className={styles.buttons}>
                    <Button className={styles.btn} onClick={toggleTypeModal}>Добавить тип</Button>
                    <Button className={styles.btn} >Добавить бренд</Button>
                    <Button className={styles.btn} >Добавить товар</Button>
                </div>
            </div>

            <Modal active={typeModal} setActive={setTypeModal}></Modal>
        </Container>
    )
}

export default Admin