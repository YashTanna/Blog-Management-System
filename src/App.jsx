import { useEffect, useState } from 'react'
import './App.css'
import { useDispatch } from "react-redux";
import {login,logout} from './store/authSlice'
import authService from './appwrite/auth'
import {Header,Footer} from './components'
import {Outlet} from 'react-router-dom'

function App() {

  const [loading,setLoading] = useState(true)
  const dispatch = useDispatch()

  useEffect(() => {
    authService.getCurrentUser()
    .then((userData) => {
      if (userData) {
        dispatch(login({userData}))
      } else {
        dispatch(logout())
      }
    })
    .finally(() => setLoading(false))
  }, [])

  if(loading){
    return null
  }else{
    return (
      <div className='min-h-screen bg-gray-400 flex flex-wrap content-between'>
        <div className='w-full block'>
          <Header/>
          <main>
           TODO: {/* <Outlet/> */}
          </main>
          <Footer/>
        </div>
      </div>
    )
  }
}

export default App
