import React, { createContext } from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import UserStore from './store/UserStore'
import DeviceStore from './store/DeviceStore';

export const Context = createContext(null)

const store = {
  user: new UserStore(),
  device: new DeviceStore(),
}

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <Context.Provider value={store} >
    <App />
  </Context.Provider>
)

