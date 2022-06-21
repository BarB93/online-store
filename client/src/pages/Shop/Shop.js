import React, { useContext, useEffect } from 'react'
import { observer } from 'mobx-react-lite'

import { fetchBrands, fetchDevices, fetchTypes } from '../../http/deviceAPI'
import { Context } from '../../index'
import Container from '../../components/UI/Container/Container'
import TypeBar from '../../components/Shop/TypeBar/TypeBar'
import BrandBar from '../../components/Shop/BrandBar/BrandBar'
import DeviceList from '../../components/Shop/DeviceList/DeviceList'
import Pagination from '../../components/Pagination/Pagination'

import styles from './Shop.module.scss'

const Shop = observer(() => {
    const {device, type, brand} = useContext(Context)

    useEffect(() => {
        // Types
        fetchTypes().then(data => {type.setTypes(data)})
        .catch(e => alert(e.massage))
        .finally(() => type.setIsLoadingTypes(false))
        
        // Brands
        fetchBrands().then(data => brand.setBrands(data))
        .catch(e => alert(e.massage))
        .finally(() => brand.setIsLoadingBrands(false)) 

        // Devices
        fetchDevices(type.selectedType?.id, brand.selectedBrand?.id, 1, device.limit).then((data) => {
            device.setDevices(data.rows)
            device.setTotalCount(data.count)
        })
        .catch(e => alert(e))
        .finally(() => {device.setIsLoadingDevices(false)})

        //  TODO barb: uncomment if you want reset selectedType and selectedBrand 
        // return () => {
        //     type.setSelectedType(null)
        //     brand.setSelectedBrand(null)
        // }
       
    }, [])

    useEffect(() => {
        device.setIsLoadingDevices(true)
        fetchDevices(type.selectedType?.id, brand.selectedBrand?.id, device.page, device.limit)
        .then((data) => {
            device.setDevices(data.rows)
            device.setTotalCount(data.count)
        })
        .catch(e => alert(e))
        .finally(() => {device.setIsLoadingDevices(false)})
    }, [type.selectedType, brand.selectedBrand, device.page, device.limit])

    return (
        <Container>
            <div className={styles.container}>
                <aside className={styles.aside}>
                    <TypeBar />
                </aside>
                <main className={styles.main}>
                    <BrandBar />
                    <DeviceList />
                    <Pagination />
                </main>
            </div>
        </Container>
    )
})

export default Shop