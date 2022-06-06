import React, { useContext } from 'react'
import { observer } from 'mobx-react-lite'

import { Context } from '../../../index'
import BrandBarSkeleton from './BrandBarSkeleton'

import styles from './BrandBar.module.scss'

const BrandBar = observer(() => {
    const {device, user} = useContext(Context)
    return (
        (user.isLoading || device.isLoadingBrand) ? <BrandBarSkeleton />
        :
        <ul className={styles.list}>
            {
                device.brands.map(brand => 
                <li 
                    key={brand.id} 
                    className={styles.list__item + ' ' + (brand.id === device.selectedBrand.id ? styles.active : '')}
                    onClick={() => device.setSelectedBrand(brand)}
                >
                    {brand.name}
                </li>)
            }
        </ul>
    )
})

export default BrandBar