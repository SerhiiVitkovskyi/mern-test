import React from 'react'
import {BrowserRouter as Router} from 'react-router-dom'
import {useRoutes} from './routes'
import {useAuth} from './hooks/auth.hook'
import {AuthContext} from './context/AuthContext'
import {Navbar} from './components/Navbar'
import {Loader} from './components/Loader'
import 'materialize-css'

function App() {
  const {token, login, logout, userId, ready} = useAuth()
  const isAuthenticated = !!token
  const routes = useRoutes(isAuthenticated) // почему у меня не работает useRoutes(isAuthentificated: false) 
  
  if (!ready) {
    return <Loader />
  }

  return (
    <AuthContext.Provider value={{
      token, login, logout, userId, isAuthenticated
    }}>
      <Router>
        {isAuthenticated && <Navbar/>} {/*if User is authenticated Navbar will be shown*/}
        <div className="container">
        {/*<h1>Hello</h1>*/}
          {routes}
        </div>
      </Router>
    </AuthContext.Provider>
  )
}

export default App;
