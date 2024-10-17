import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom'
import store from './redux/store.js'
import { Provider } from 'react-redux'
import App from './App.jsx'
import './index.css'
import Home from './pages/Home/Home.jsx'
import Dashboard from './pages/Dashboard/Dashboard.jsx'
import PrivateRoute from './pages/PrivateRoute.jsx'
import SriPay from './pages/SriPay/SriPay.jsx'
import GratuityPay from './pages/GratuityPay/GratuityPay.jsx'
import FormDetails from './pages/FormDetails/FormDetails.jsx'
import History from './pages/History/History.jsx'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index={true} path="/" element={<Home />} />
      <Route path="" element={<PrivateRoute />}>
        {/* Private Routes */}
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/sri" element={<SriPay />} />
        <Route path="/gratuity" element={<GratuityPay />} />
        <Route path="/history" element={<History />} />
      </Route>
    </Route>
  )
)

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <StrictMode>
      <RouterProvider router={router} />
    </StrictMode>
  </Provider>
)
