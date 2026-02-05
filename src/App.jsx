import { useEffect, useState } from 'react'
import './App.css'
import { useDispatch } from 'react-redux'
import authservice from './AppWrite/Auth'
import { setAuthenticated, logout } from '../src/Features/authSlice'
import { Header, Footer, Loader, ScrollToTop } from './Components/index.js'
import { Outlet } from 'react-router-dom'

function App() {

  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    authservice.getCurrentUser()
      .then((userData) => {
        if (userData) {
          dispatch(setAuthenticated(userData))
        } else {
          dispatch(logout())
        }
      })
      .finally(() => setLoading(false))
  }, [dispatch])

  return !loading ? (
    <div className="min-h-screen flex flex-col bg-gray-400">
      <ScrollToTop />
      <Header />
      <main className="min-h-screen flex-grow bg-[#0e121c]">
        <Outlet />
      </main>
      <Footer />
    </div>
  ) : <Loader />;
}

export default App
