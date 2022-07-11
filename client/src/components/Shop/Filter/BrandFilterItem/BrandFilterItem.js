import React, { useContext } from 'react'
import { observer } from 'mobx-react-lite'
import { useTranslation } from 'react-i18next'

import { Context } from '../../../..'

import FilterCommonStyles from '../FilterCommonStyles.module.scss'

const BrandFilterItem = observer(({brand}) => {
    const {brand: brandStore} = useContext(Context)
    const i18n = useTranslation()
    const isChecked = brandStore.selectedBrands.includes(brand.id)

    const selectedHandler = (e) => {
        if(isChecked) {
            brandStore.removeSelectedBrand(brand.id)
        } else {
            brandStore.addSelectedBrand(brand.id)
        }
    }

    return (
        <div className={`${FilterCommonStyles.filter__item}`} onClick={selectedHandler}>
            <div className='customCheckbox__label'>
                <input className='customCheckbox__input' type='checkbox' checked={isChecked} onChange={() => {}} />
                <div className='customCheckbox__checkbox'></div>
            </div>
            <div className={FilterCommonStyles.filter__name}>{i18n.t(brand.name)}</div>
        </div>
    )
})

export default BrandFilterItem