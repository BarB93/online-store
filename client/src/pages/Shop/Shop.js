import React, { useContext, useEffect } from 'react'
import { observer } from 'mobx-react-lite'

import deviceAPI from '../../http/deviceAPI'
import { Context } from '../../index'
import Container from '../../components/UI/Container/Container'
import DeviceList from '../../components/Shop/DeviceList/DeviceList'
import Pagination from '../../components/Pagination/Pagination'
import FilterBar from '../../components/Shop/Filter/FilterBar/FilterBar'

import styles from './Shop.module.scss'

const Shop = observer(() => {
    const {device, type, brand} = useContext(Context)

    useEffect(() => {
        // Types
        deviceAPI.fetchTypes().then(data => {type.setTypes(data)})
        .catch(e => alert(e.massage))
        .finally(() => type.setIsLoadingTypes(false))
        
        // Brands
        deviceAPI.fetchBrands().then(data => brand.setBrands(data))
        .catch(e => alert(e.massage))
        .finally(() => brand.setIsLoadingBrands(false)) 

        // Devices
        deviceAPI.fetchDevices(type.selectedType?.id, brand.selectedBrand?.id, 1, device.limit).then((data) => {
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
        deviceAPI.fetchDevices(type.selectedTypes, brand.selectedBrands, device.page, device.limit)
        .then((data) => {
            device.setDevices(data.rows)
            device.setTotalCount(data.count)
        })
        .catch(e => alert(e))
        .finally(() => {device.setIsLoadingDevices(false)})
    }, [type.selectedTypes, brand.selectedBrands, device.limit, device.page])

    return (
        <Container>
            <div className={styles.container}>
                <aside className={styles.aside}>
                    <FilterBar />
                </aside>
                <main className={styles.main}>
                    <DeviceList />
                    <Pagination />
                </main>
            </div>
        </Container>
    )
})

export default Shop