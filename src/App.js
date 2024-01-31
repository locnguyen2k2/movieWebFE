import { Outlet } from 'react-router-dom';
import { Header, Footer } from './partials/index';
import { ContextProvider } from './components/Context';
import './assets/scss/app.scss'

function App() {
  return (
    <ContextProvider>
      <div className="container">
        <div className='header container-fluid'>
          <Header />
        </div>
        <Outlet />
        <div className='footer container-fluid'>
          <Footer />
        </div>
      </div>
    </ContextProvider>
  )
}

export default App;
