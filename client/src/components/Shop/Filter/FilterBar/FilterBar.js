import React from 'react'
import { useTranslation } from 'react-i18next'

import BrandFilter from '../BrandFilter/BrandFilter'
import FilterItem from '../FilterItem/FilterItem'
import TypeFilter from '../TypeFilter/TypeFilter'

import styles from './FilterBar.module.scss'

const FilterBar = () => {
    const i18n = useTranslation()

    return (
        <>
            <div className={styles.filter__item}>
                <FilterItem title={i18n.t('Type')}>
                    <TypeFilter />
                </FilterItem>
                <FilterItem title={i18n.t('Brand')}>
                    <BrandFilter />
                </FilterItem>
                <FilterItem title={i18n.t('Price currency', { currency: '₽' })}></FilterItem>
            </div>
        </>
    )
}

export default FilterBar