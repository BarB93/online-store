import React, { createContext } from 'react'
import ReactDOM from 'react-dom/client'
import { UserStore, TypeStore, BrandStore, DeviceStore, ToastStore, AppStore, BasketStore, PriceStore } from './store'
import App from './App'

export const Context = createContext(null)

const store = {
  user: UserStore,
  device: DeviceStore,
  type: TypeStore,
  brand: BrandStore,
  toast: ToastStore,
  app: AppStore,
  basket: BasketStore,
  price: PriceStore,
}

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <Context.Provider value={store}>
    <App />
  </Context.Provider>
)

