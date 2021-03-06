import React, {useContext, useEffect} from 'react'
import { BrowserRouter  } from 'react-router-dom'
import { observer } from 'mobx-react-lite'
import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

import basketAPI from './http/basketAPI'
import userAPI from './http/userAPI'
import { translationRU, translationEN } from './translations'
import { languages } from './utils/consts'
import { Context } from './index'
import SpinnerRoller from './components/UI/spinners/SpinnerRoller/SpinnerRoller'
import AppRouter from './components/AppRouter'
import NavBar from './components/NavBar/NavBar'
import Toast from './components/UI/Toast/Toast'

import './styles/normalize.scss'
import './styles/styles.scss'

const App = observer(() => {
  const {user, app, basket} = useContext(Context)

  // init translation
  useEffect(() => {
    i18n
      .use(initReactI18next)
      .init({
        resources: {
          [languages.russian]: { translation: translationRU },
          [languages.english]: { translation: translationEN },
        },
        lng: app.lang,
        fallbackLng: app.mainLang,
      })
  },[])

  // check auth
  useEffect(() => {
    userAPI.check().then((data) => {
      user.setUser(data)
      user.setIsAuth(true)
    })
    .catch(e => {
      user.setIsAuth(false)
    })
    .finally(() => {
      user.setIsLoading(false)
    })
    
  },[])

  // basket total quantity items
  useEffect(() => {
    if(user.isAuth) {
      basketAPI.fetchQuantityBasketItems()
        .then(data => basket.setTotalQuantity(data))
    }
  }, [user.isAuth])

  // chenging language
  useEffect(() => {
    i18n.changeLanguage(app.lang)
  }, [app.lang])

  return (
    user.isLoading ? <div className='AppLoading'><SpinnerRoller /></div>
    :
    <BrowserRouter>
      <NavBar />
      <AppRouter />
      <Toast />
    </BrowserRouter>
  )
})

export default App
