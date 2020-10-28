import React, {useState, useEffect, useContext} from 'react'
import { AuthContext } from '../context/AuthContext'
import {useHttp} from '../hooks/http.hook'
import { useMessage } from '../hooks/message.hook'

export const AuthPage = () => {
  const auth = useContext(AuthContext)
  const message = useMessage()
  const {loading, error, request, clearError} = useHttp()
  
  const [form, setForm] = useState({
    email: '', password: ''
  })
  
  useEffect(() => {
    // console.log('Error ', error) // LOG
    message(error)
    clearError()
  }, [error, message, clearError])

  useEffect(() => { window.M.updateTextFields() }, [])

  const changeHandler = event => {
    setForm({...form, [event.target.name]: event.target.value })
  }
  
  const registerHandler = async () => {
    try {
      const data = await request('/api/auth/register', 'POST', {...form })
      // console.log('Data: ', data) // LOG
      message(data.message)
    } catch (error) {}
  }

  const loginHandler = async () => {
    try {
      const data = await request('/api/auth/login', 'POST', {...form })
      // console.log('Data: ', data) // LOG
      // message(data.message)
      auth.login(data.token, data.userId)
    } catch (error) {}
  }

  return (
    <div className="row">
      <div className="col s6 offset-s3">
        <h1>Shorten the link</h1>
        <div className="card blue darken-1">
          <div className="card-content white-text">
            <span className="card-title">Authorization</span>
              
              <div className="input-field">
                <input 
                  placeholder="Enter email"
                  id="email" 
                  type="text" 
                  className="validate yellow-input" //className={[classes.button, classes.test ]}
                  name="email"
                  value={form.email}
                  onChange={changeHandler}
                />
                <label htmlFor="email">Email</label>
              </div>
              
              <div className="input-field">
                <input 
                  placeholder="Enter password"
                  id="password" 
                  type="password" 
                  className="validate yellow-input"
                  name="password" 
                  value={form.password}
                  onChange={changeHandler}
                />
                <label htmlFor="password">Password</label>
              </div>
          </div>  
          <div className="card-action">
            <button 
              className="btn yellow darken-4" 
              style={{marginRight: "20px"}} 
              disabled={loading}
              onClick={loginHandler}
             >
              Log in
            </button>
            <button 
              className="btn grey lighten-1 white-text"
              onClick={registerHandler}
              disabled={loading}
            >
              Register
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}