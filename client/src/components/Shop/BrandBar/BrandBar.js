import React, { useContext } from 'react'
import { observer } from 'mobx-react-lite'

import { Context } from '../../../index'

import styles from './BrandBar.module.scss'

const BrandBar = observer(() => {
    const {device} = useContext(Context)

    return (
        <ul className={styles.list}>
            {device.brands.map(brand => 
                <li 
                    key={brand.id} 
                    className={styles.list__item + ' ' + (brand.id === device.selectedBrand.id ? styles.active : '')}
                    onClick={() => device.setSelectedBrand(brand)}
                >
                    {brand.name}
                </li>
            )}
        </ul>
    )
})

export default BrandBar