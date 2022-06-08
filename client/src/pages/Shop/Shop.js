import React, { useContext, useEffect } from 'react'
import { observer } from 'mobx-react-lite'

import { fetchBrands, fetchDevices, fetchTypes } from '../../http/deviceAPI'
import { Context } from '../../index'
import Container from '../../components/UI/Container/Container'
import TypeBar from '../../components/Shop/TypeBar/TypeBar'
import BrandBar from '../../components/Shop/BrandBar/BrandBar'
import DeviceList from '../../components/Shop/DeviceList/DeviceList'

import styles from './Shop.module.scss'

const Shop = observer(() => {
    const {device, type} = useContext(Context)

    useEffect(() => {
        // Types
        fetchTypes().then(data => {type.setTypes(data)})
        .catch(e => alert(e.massage))
        .finally(() => type.setIsLoadingTypes(false))
        
        // Brands
        fetchBrands().then(data => device.setBrands(data))
        .catch(e => alert(e.massage))
        .finally(() => device.setIsLoadingBrands(false)) 

        // Devices
        fetchDevices().then((devices) => {
            device.setDevices(devices.rows)
        })
        .catch(e => alert(e))
        .finally(() => {device.setIsLoadingDevices(false)})
       
    }, [])

    return (
        <Container>
            <div className={styles.container}>
                <aside className={styles.aside}>
                    <TypeBar />
                </aside>
                <main className={styles.main}>
                    <BrandBar />
                    <DeviceList />
                </main>
            </div>
        </Container>
    )
})

export default Shop