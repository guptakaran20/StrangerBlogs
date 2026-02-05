import React from "react"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import authservice from "../AppWrite/Auth"
import { logout } from "../Features/authSlice"

function LogoutBtn() {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleLogout = async () => {
  try {
    await authservice.logout()
  } catch (err) {
    console.warn("No active session to logout")
  } finally {
    dispatch(logout())
  }
}


  return (
    <button
      onClick={handleLogout}
      className="        px-3 sm:px-4 py-1.5
        rounded-full
        bg-red-500/90 text-whit
        text-xs sm:text-sm font-medium
        hover:bg-red-600
        transition-colors duration-200
        whitespace-nowrap:"
    >
      Logout
    </button>
  )
}

export default LogoutBtn
