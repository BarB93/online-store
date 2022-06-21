import React, { useContext } from 'react'
import { observer } from 'mobx-react-lite'

import { Context } from '../../../index'
import BrandBarSkeleton from './BrandBarSkeleton'

import styles from './BrandBar.module.scss'

const BrandBar = observer(() => {
    const {brand, device} = useContext(Context)
    
    return (
        (brand.isLoadingBrands) ? <BrandBarSkeleton />
        :
        <ul className={styles.list}>
            {
                brand.brands.map(b => 
                <li 
                    key={b.id} 
                    className={styles.list__item + ' ' + (b.id === brand.selectedBrand?.id ? styles.active : '')}
                    onClick={() => {
                        brand.setSelectedBrand(b)
                        device.setPage(1)
                    }}
                >
                    {b.name}
                </li>)
            }
        </ul>
    )
})

export default BrandBar