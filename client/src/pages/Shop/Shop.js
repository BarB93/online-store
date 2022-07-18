import React, { useContext, useEffect } from 'react'
import { observer } from 'mobx-react-lite'

import deviceAPI from '../../http/deviceAPI'
import { Context } from '../../index'
import Container from '../../components/UI/Container/Container'
import DeviceList from '../../components/Shop/DeviceList/DeviceList'
import Pagination from '../../components/Pagination/Pagination'
import FilterBar from '../../components/Shop/Filter/FilterBar/FilterBar'
import DeviceSort from '../../components/Shop/DeviceSort/DeviceSort'

import styles from './Shop.module.scss'

const Shop = observer(() => {
    const {device, type, brand, price} = useContext(Context)

    useEffect(() => {
        // Types
        type.setIsLoadingTypes(true)
        deviceAPI.fetchTypes().then(data => {type.setTypes(data)})
        .catch(e => alert(e.massage))
        .finally(() => type.setIsLoadingTypes(false))
        
        // Brands
        brand.setIsLoadingBrands(true)
        deviceAPI.fetchBrands().then(data => brand.setBrands(data))
        .catch(e => alert(e.massage))
        .finally(() => brand.setIsLoadingBrands(false)) 

        // Devices
        deviceAPI.fetchDevices({
            page: device.page,
            limit: device.limit,
            typeIds: type.selectedTypes,
            brandIds: brand.selectedBrands,
            minPrice: price.inputedMinPrice,
            maxPrice: price.inputedMaxPrice,
        }).then((data) => {
            device.setDevices(data.rows)
            device.setTotalCount(data.count)
        })
        .catch(e => alert(e))
        .finally(() => {device.setIsLoadingDevices(false)})
    }, [])

    useEffect(() => {
        device.setIsLoadingDevices(true)
        deviceAPI.fetchDevices({
            page: device.page,
            limit: device.limit,
            typeIds: type.selectedTypes,
            brandIds: brand.selectedBrands,
            minPrice: price.inputedMinPrice,
            maxPrice: price.inputedMaxPrice,
        })
        .then((data) => {
            device.setDevices(data.rows)
            device.setTotalCount(data.count)
            price.setMinPrice(data.minPrice)
            price.setMaxPrice(data.maxPrice)
        })
        .catch(e => alert(e))
        .finally(() => {device.setIsLoadingDevices(false)})
    }, [type.selectedTypes, brand.selectedBrands, device.limit, device.page, price.inputedMinPrice, price.inputedMaxPrice])

    useEffect(() => {
        price.setStateMinPrice('')
        price.setStateMaxPrice('')
        device.setPage(1)
    }, [type.selectedTypes, brand.selectedBrands])

    return (
        <Container>
            <div className={styles.container}>
                <aside className={styles.aside}>
                    <FilterBar />
                </aside>
                <main className={styles.main}>
                    <DeviceSort />
                    <DeviceList />
                    <Pagination />
                </main>
            </div>
        </Container>
    )
})

export default Shop