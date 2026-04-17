import { Routes, Route, Navigate } from 'react-router-dom'
import MainLayout from './layout/MainLayout'
import Home from './pages/Home'
import Services from './pages/Services'
import Booking from './pages/Booking'
import Shop from './pages/Shop'
import About from './pages/About'
import Contact from './pages/Contact'
import AdminLayout from './layout/AdminLayout'
import AdminDashboard from './pages/admin/Dashboard'
import AdminLogin from './pages/admin/AdminLogin'
import AdminGuard from './components/AdminGuard'
import AdminOrders from './pages/admin/Orders'
import AdminProducts from './pages/admin/Products'
import AdminServices from './pages/admin/Services'

function App() {
  return (
    <Routes>
      {/* ─── Public Routes ─────────────────────────────────── */}
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Home />} />
        <Route path="services" element={<Services />} />
        <Route path="commander" element={<Booking />} />
        <Route path="boutique" element={<Shop />} />
        <Route path="a-propos" element={<About />} />
        <Route path="contact" element={<Contact />} />
      </Route>

      {/* ─── Admin Login (not linked in the UI) ────────────── */}
      <Route path="/admin/login" element={<AdminLogin />} />

      {/* ─── Admin Protected Routes ─────────────────────────── */}
      {/* Only accessible after phone+PIN auth on /admin/login  */}
      <Route element={<AdminGuard />}>
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminDashboard />} />
          <Route path="orders" element={<AdminOrders />} />
          <Route path="products" element={<AdminProducts />} />
          <Route path="services" element={<AdminServices />} />
        </Route>
      </Route>

      {/* ─── Redirect old /login & /register to home ────────── */}
      <Route path="/login" element={<Navigate to="/" replace />} />
      <Route path="/register" element={<Navigate to="/" replace />} />

      {/* ─── 404 fallback ───────────────────────────────────── */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

export default App
