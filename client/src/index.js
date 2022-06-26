import React, { createContext } from 'react'
import ReactDOM from 'react-dom/client'
import { UserStore, TypeStore, BrandStore, DeviceStore, ToastStore, AppStore } from './store'
import App from './App'

export const Context = createContext(null)

const store = {
  user: new UserStore(),
  device: new DeviceStore(),
  type: new TypeStore(),
  brand: new BrandStore(),
  toast: new ToastStore(),
  app: new AppStore(),
}

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <Context.Provider value={store} >
    <App />
  </Context.Provider>
)

