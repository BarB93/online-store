import React, { useContext, useMemo } from 'react'
import { observer } from 'mobx-react-lite'

import { Context } from '../../index'

import styles from './Pagination.module.scss'

const Pagination = observer(() => {
    const {device} = useContext(Context)
    const countPages = useMemo(() => {
        return Math.ceil(device.totalCount / device.limit)
    }, [device.totalCount, device.limit])

    return (
        countPages <= 1 ? null 
        :
        <div className={styles.pagination}>
            {new Array(countPages).fill(0).map((item, index) => {
                const pageNumber = index+1
                return <button className={`${styles.pagination__btn} ${pageNumber === device.page ? styles.active : ''}`} key={pageNumber} onClick={() => device.setPage(pageNumber)}>{pageNumber}</button>
            })}
        </div>
    )
})

export default Pagination