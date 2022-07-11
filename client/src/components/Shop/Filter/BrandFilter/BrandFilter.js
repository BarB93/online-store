import React, { useContext } from 'react'
import { observer } from 'mobx-react-lite'

import { Context } from '../../../../index'
import BrandFilterItem from '../BrandFilterItem/BrandFilterItem'

import FilterCommonStyles from '../FilterCommonStyles.module.scss'

const BrandFilter = observer(() => {
    const {brand} = useContext(Context)

    return (
        <div className={FilterCommonStyles.filter}>
            {brand.brands.map(item => <BrandFilterItem key={item.id} brand={item} />)}
        </div>
    )
})

export default BrandFilter