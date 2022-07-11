import React, { useContext } from 'react'
import { observer } from 'mobx-react-lite'
import { useTranslation } from 'react-i18next'

import { Context } from '../../../..'

import FilterCommonStyles from '../FilterCommonStyles.module.scss'


const TypeFilterItem = observer(({type}) => {
    const {type: typeStore} = useContext(Context)
    const i18n = useTranslation()
    const isChecked = typeStore.selectedTypes.includes(type.id)

    const selectedHandler = (e) => {
        if(isChecked) {
            typeStore.removeSelectedType(type.id)
        } else {
            typeStore.addSelectedType(type.id)
        }
    }

    return (
        <div className={`${FilterCommonStyles.filter__item}`} onClick={selectedHandler}>
            <div className='customCheckbox__label'>
                <input className='customCheckbox__input' type='checkbox' checked={isChecked} onChange={() => {}} />
                <div className='customCheckbox__checkbox'></div>
            </div>
            <div className={FilterCommonStyles.filter__name}>{i18n.t(type.name)}</div>
        </div>
    )
})

export default TypeFilterItem