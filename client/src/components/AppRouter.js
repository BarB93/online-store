import React, { useContext } from 'react'
import {Routes, Route, Navigate} from 'react-router-dom'
import { observer } from 'mobx-react-lite'

import { adminRoutes, authRoutes, publicRoutes } from '../routes'
import { Context } from '../index'
import { SHOP_ROUTE } from '../utils/consts'

const AppRouter = observer(() => {
    const {user} = useContext(Context)
    
    return (
        <Routes>   
            {user.user.role === 'ADMIN' && adminRoutes.map(({path, Component}) => <Route key={path} path={path} element={<Component />}/>)}
            {user.isAuth && authRoutes.map(({path, Component}) => <Route key={path} path={path} element={<Component />}/>)}
            {publicRoutes.map(({path, Component}) => <Route key={path} path={path} element={<Component />}/>)}
            <Route
                path="*"
                element={<Navigate to={SHOP_ROUTE} replace />}
            />             
        </Routes>
    )
})

export default AppRouter