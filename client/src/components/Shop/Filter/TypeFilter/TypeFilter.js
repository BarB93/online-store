import React, { useContext } from 'react'
import { observer } from 'mobx-react-lite'

import TypeFilterItem from '../TypeFilterItem/TypeFilterItem'

import { Context } from '../../../../index'

import FilterCommonStyles from '../FilterCommonStyles.module.scss'

const TypeFilter = observer(() => {
    const {type} = useContext(Context)

    return (
        <div className={FilterCommonStyles.filter}>{type.types.map(item => <TypeFilterItem key={item.id} type={item} />)}</div>
    )
})

export default TypeFilter