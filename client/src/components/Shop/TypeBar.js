import React, {useContext} from 'react'
import { observer } from 'mobx-react-lite'

import { Context } from '../../index'

import styles from './TypeBar.module.scss'

const TypeBar = observer(() => {
    const {device} = useContext(Context)
    console.log('Device', device)

    return (
        <ul className={styles.list}>
            {device.types.map(item => <li key={item.id} className={styles.list__item}>{item.name}</li>)}
        </ul>
    )
})

export default TypeBar