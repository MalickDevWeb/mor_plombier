import { Routes, Route, Navigate, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import PageWrapper from './components/PageWrapper'
import MainLayout from './layout/MainLayout'
import Home from './pages/Home'
import Services from './pages/Services'
import Booking from './pages/Booking'
import Shop from './pages/Shop'
import About from './pages/About'
import Contact from './pages/Contact'
import Cart from './pages/Cart'
import AdminLayout from './layout/AdminLayout'
import AdminDashboard from './pages/admin/Dashboard'
import AdminLogin from './pages/admin/AdminLogin'
import AdminGuard from './components/AdminGuard'
import AdminOrders from './pages/admin/Orders'
import AdminProducts from './pages/admin/Products'
import AdminServices from './pages/admin/Services'

function App() {
  const location = useLocation()

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        {/* ─── Public Routes ─────────────────────────────────── */}
        <Route path="/" element={<MainLayout />}>
          <Route index element={<PageWrapper><Home /></PageWrapper>} />
          <Route path="services" element={<PageWrapper><Services /></PageWrapper>} />
          <Route path="commander" element={<PageWrapper><Booking /></PageWrapper>} />
          <Route path="boutique" element={<PageWrapper><Shop /></PageWrapper>} />
          <Route path="a-propos" element={<PageWrapper><About /></PageWrapper>} />
          <Route path="contact" element={<PageWrapper><Contact /></PageWrapper>} />
          <Route path="panier" element={<PageWrapper><Cart /></PageWrapper>} />
        </Route>

        {/* ─── Admin Login (not linked in the UI) ────────────── */}
        <Route path="/admin/login" element={<PageWrapper><AdminLogin /></PageWrapper>} />

        {/* ─── Admin Protected Routes ─────────────────────────── */}
        <Route element={<AdminGuard />}>
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<PageWrapper><AdminDashboard /></PageWrapper>} />
            <Route path="orders" element={<PageWrapper><AdminOrders /></PageWrapper>} />
            <Route path="products" element={<PageWrapper><AdminProducts /></PageWrapper>} />
            <Route path="services" element={<PageWrapper><AdminServices /></PageWrapper>} />
          </Route>
        </Route>

        {/* ─── Redirects & Fallback ────────────────────────────── */}
        <Route path="/login" element={<Navigate to="/" replace />} />
        <Route path="/register" element={<Navigate to="/" replace />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </AnimatePresence>
  )
}

export default App
