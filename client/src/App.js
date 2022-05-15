import {BrowserRouter} from 'react-router-dom'
import AppRouter from './components/AppRouter'
import NavBar from './components/NavBar/NavBar'

import './styles/normalize.scss'
import './styles/styles.scss'

function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <AppRouter />
    </BrowserRouter>
  )
}

export default App
