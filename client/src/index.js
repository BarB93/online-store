import React, { createContext } from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { UserStore, TypeStore, BrandStore, DeviceStore, ToastStore } from './store'

export const Context = createContext(null)

const store = {
  user: new UserStore(),
  device: new DeviceStore(),
  type: new TypeStore(),
  brand: new BrandStore(),
  toast: new ToastStore(),
}

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <Context.Provider value={store} >
    <App />
  </Context.Provider>
)

