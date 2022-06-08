import React, {useContext, useEffect} from 'react'
import { BrowserRouter  } from 'react-router-dom'
import { observer } from 'mobx-react-lite'

import { check } from './http/userAPI'
import { Context } from './index'
import SpinnerRoller from './components/UI/spinners/SpinnerRoller/SpinnerRoller'
import AppRouter from './components/AppRouter'
import NavBar from './components/NavBar/NavBar'

import './styles/normalize.scss'
import './styles/styles.scss'

const App = observer(() => {
  const {user} = useContext(Context)

  useEffect(() => {
    check().then(({data}) => {
      user.setIsLoading(false)
      user.setIsAuth(true)
    })
    .catch(e => {
      user.setIsAuth(false)
    })
    .finally(() => {
      user.setIsLoading(false)
    })
    
  },[])

  return (
    user.isLoading ? <div className='AppLoading'><SpinnerRoller /></div>
    :
    <BrowserRouter>
      <NavBar />
      <AppRouter />
    </BrowserRouter>
  )
})

export default App
