import React, { useContext } from 'react'

import { observer } from 'mobx-react-lite'
import { useTranslation } from 'react-i18next'

import { Context } from '../../../..'
import BrandFilter from '../BrandFilter/BrandFilter'
import FilterItem from '../FilterItem/FilterItem'
import PriceFilter from '../PriceFilter/PriceFilter'
import TypeFilter from '../TypeFilter/TypeFilter'
import FilterBarSkeleton from './FilterBarSkeleton'

import styles from './FilterBar.module.scss'

const FilterBar = observer(() => {
    const {user} = useContext(Context)
    const i18n = useTranslation()

    return (
        <>
            {
                user.isLoading ? <FilterBarSkeleton />
                :
                <div className={styles.filter}>
                    <FilterItem title={i18n.t('Type')}>
                        <TypeFilter />
                    </FilterItem>
                    <FilterItem title={i18n.t('Brand')}>
                        <BrandFilter />
                    </FilterItem>
                    <FilterItem title={i18n.t('Price currency', { currency: '₽' })}>
                        <PriceFilter />
                    </FilterItem>
                </div>
            } 
        </>
    )
})

export default FilterBar