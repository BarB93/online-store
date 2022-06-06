import React, {useContext} from 'react'
import { observer } from 'mobx-react-lite'

import { Context } from '../../../index'
import TypeBarSkeleton from './TypeBarSkeleton'

import styles from './TypeBar.module.scss'

const TypeBar = observer(() => {
    const {device, user} = useContext(Context)

    return (
        (user.isLoading || device.isLoadingType) ? <TypeBarSkeleton />
        :
        <ul className={styles.list}>
            {device.types.map(type => 
                <li 
                    key={type.id} 
                    className={styles.list__item + ' ' + (type.id === device.selectedType.id ? styles.active : '')} 
                    onClick={() => device.setSelectedType(type)}
                >
                    {type.name}
                </li>
            )}
        </ul>
    )
})

export default TypeBar