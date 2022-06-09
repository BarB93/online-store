import React, {useContext} from 'react'
import { observer } from 'mobx-react-lite'

import { Context } from '../../../index'
import TypeBarSkeleton from './TypeBarSkeleton'

import styles from './TypeBar.module.scss'

const TypeBar = observer(() => {
    const {type} = useContext(Context)
    
    return (
        (type.isLoadingTypes) ? <TypeBarSkeleton />
        :
        <ul className={styles.list}>
            {type.types.map(t => 
                <li 
                    key={t.id} 
                    className={styles.list__item + ' ' + (t.id === type.selectedType.id ? styles.active : '')} 
                    onClick={() => type.setSelectedType(t)}
                >
                    {t.name}
                </li>
            )}
        </ul>
    )
})

export default TypeBar