import React, {useContext} from 'react'
import { observer } from 'mobx-react-lite'

import { Context } from '../../../index'
import DeviceItem from '../DeviceItem/DeviceItem'
import DeviceItemSkeleton from '../DeviceItem/DeviceItemSkeleton';

import styles from './DeviceList.module.scss'

const DeviceList = observer(() => {
    const {device, user} = useContext(Context)

    return (
        <div className={styles.list}>
            { user.isLoading ? new Array(12).fill(0).map((i, index) => <DeviceItemSkeleton key={index} />)
                :
                device.devices.map(device => 
                <DeviceItem key={device.id} device={device} />
            )}
        </div>
    )
})

export default DeviceList