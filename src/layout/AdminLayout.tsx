import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom'
import { 
  LayoutDashboard, 
  Wrench, 
  ShoppingBag, 
  Settings, 
  LogOut, 
  Menu, 
  X,
  Bell,
  Search,
  ClipboardList
} from 'lucide-react'
import { useState } from 'react'

const AdminLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)
  const location = useLocation()
  const navigate = useNavigate()

  const menuItems = [
    { name: 'Tableau de bord', path: '/admin', icon: <LayoutDashboard size={20} /> },
    { name: 'Commandes', path: '/admin/orders', icon: <ClipboardList size={20} /> },
    { name: 'Services', path: '/admin/services', icon: <Wrench size={20} /> },
    { name: 'Produits', path: '/admin/products', icon: <ShoppingBag size={20} /> },
    { name: 'Paramètres', path: '/admin/settings', icon: <Settings size={20} /> },
  ]

  const handleLogout = () => {
    sessionStorage.removeItem('mor_admin_auth')
    navigate('/admin/login')
  }

  const isActive = (path: string) => location.pathname === path

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <aside 
        className={`${
          isSidebarOpen ? 'translate-x-0 w-64' : '-translate-x-full w-64 md:translate-x-0 md:w-20'
        } bg-gray-900 transition-all duration-300 flex flex-col fixed h-full z-50`}
      >
        <div className="p-6 flex items-center justify-between border-b border-white/10">
          {isSidebarOpen && (
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center text-white font-bold">M</div>
              <span className="text-white font-bold text-lg tracking-tight">MOR <span className="text-primary-500">ADMIN</span></span>
            </div>
          )}
          <button 
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="text-gray-400 hover:text-white"
            aria-label={isSidebarOpen ? "Fermer le menu" : "Ouvrir le menu"}
            title={isSidebarOpen ? "Fermer" : "Ouvrir"}
          >
            {isSidebarOpen ? <X size={20} /> : <Menu size={24} />}
          </button>
        </div>

        <nav className="flex-1 p-4 space-y-2">
          {menuItems.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              className={`flex items-center gap-4 px-4 py-3 rounded-xl transition-all ${
                isActive(item.path) 
                  ? 'bg-primary-600 text-white shadow-lg shadow-primary-600/20' 
                  : 'text-gray-400 hover:bg-white/5 hover:text-white'
              }`}
            >
              <div className="flex-shrink-0">{item.icon}</div>
              {isSidebarOpen && <span className="font-medium">{item.name}</span>}
            </Link>
          ))}
        </nav>

        <div className="p-4 border-t border-white/10">
          <button 
            onClick={handleLogout}
            className="flex items-center gap-4 px-4 py-3 w-full text-red-400 hover:bg-red-500/10 rounded-xl transition-all"
          >
            <LogOut size={20} />
            {isSidebarOpen && <span className="font-medium">Déconnexion</span>}
          </button>
        </div>
      </aside>

      {/* Overlay for mobile */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-gray-900/50 z-40 md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Main Content */}
      <main className={`flex-1 transition-all duration-300 w-full ${isSidebarOpen ? 'md:ml-64' : 'md:ml-20'}`}>
        {/* Topbar */}
        <header className="h-20 bg-white border-b border-gray-100 flex items-center justify-between px-4 md:px-8 sticky top-0 z-30">
          <div className="flex items-center gap-4">
            <button 
              className="md:hidden p-2 text-gray-400 hover:text-gray-900"
              onClick={() => setIsSidebarOpen(true)}
              aria-label="Ouvrir le menu mobile"
              title="Menu"
            >
              <Menu size={24} />
            </button>
            <div className="hidden md:flex items-center gap-4 bg-gray-50 px-4 py-2 rounded-xl w-96 border border-gray-100">
              <Search size={18} className="text-gray-400" />
              <input 
                type="text" 
                placeholder="Rechercher..." 
                className="bg-transparent border-none focus:ring-0 w-full text-sm font-medium"
              />
            </div>
          </div>

          <div className="flex items-center gap-6">
            <button 
              className="relative p-2 text-gray-400 hover:text-primary-600 transition-colors"
              aria-label="Notifications"
              title="Notifications"
            >
              <Bell size={22} />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
            </button>
            
            <div className="flex items-center gap-3 pl-6 border-l border-gray-100">
              <div className="text-right hidden sm:block">
                <div className="text-sm font-bold text-gray-900">Mor Sylla</div>
                <div className="text-xs text-gray-500">Administrateur</div>
              </div>
              <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center text-primary-600 font-bold border-2 border-white shadow-sm">
                M
              </div>
            </div>
          </div>
        </header>

        <div className="p-8">
          <Outlet />
        </div>
      </main>
    </div>
  )
}

export default AdminLayout
