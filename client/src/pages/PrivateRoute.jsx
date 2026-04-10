import { Navigate, Outlet } from 'react-router-dom'
import { useSelector } from 'react-redux'

const PrivateRoute = () => {
  const { userInfo } = useSelector((state) => state.auth)
  return userInfo ? <Outlet /> : <Navigate to="/" replace />
}

export default PrivateRoute

export const AdminRoute = () => {
  const { userInfo } = useSelector((state) => state.auth)
  return userInfo?.isAdmin ? <Outlet /> : <Navigate to="/history" replace />
}
