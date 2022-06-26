import React, {useContext} from 'react'
import { observer } from 'mobx-react-lite'
import { useTranslation } from 'react-i18next'

import { Context } from '../../../index'
import TypeBarSkeleton from './TypeBarSkeleton'

import styles from './TypeBar.module.scss'

const TypeBar = observer(() => {
    const {type, device} = useContext(Context)
    const i18n = useTranslation()
    
    return (
        (type.isLoadingTypes) ? <TypeBarSkeleton />
        :
        <ul className={styles.list}>
            {type.types.map(t => 
                <li 
                    key={t.id} 
                    className={styles.list__item + ' ' + (t.id === type.selectedType?.id ? styles.active : '')} 
                    onClick={() => {
                        type.setSelectedType(t)
                        device.setPage(1)
                    }}
                >
                    {i18n.t(t.name)}
                </li>
            )}
        </ul>
    )
})

export default TypeBar