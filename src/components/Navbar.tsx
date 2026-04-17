import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X, Phone, ShoppingBag } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navLinks = [
    { name: 'Accueil', path: '/' },
    { name: 'Services', path: '/services' },
    { name: 'Boutique', path: '/boutique' },
    { name: 'À Propos', path: '/a-propos' },
    { name: 'Contact', path: '/contact' },
  ]

  const isActive = (path: string) => location.pathname === path

  return (
    <nav 
      className={`fixed top-6 left-1/2 -translate-x-1/2 z-50 w-[calc(100%-2rem)] max-w-7xl transition-all duration-500 overflow-hidden ${
        scrolled ? 'glass-card py-3 px-8 shadow-2xl' : 'bg-transparent py-5 px-4'
      }`}
    >
      <div className="flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 group">
          <div className="w-10 h-10 bg-primary-600 rounded-xl flex items-center justify-center text-white font-black text-xl shadow-lg shadow-primary-600/30 group-hover:scale-110 transition-transform">
            M
          </div>
          <span className={`font-black text-2xl tracking-tighter font-outfit ${ (scrolled || location.pathname !== '/') ? 'text-gray-900' : 'text-white'}`}>
            MOR <span className="text-primary-500">PLOMBERIE</span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className={`font-bold text-sm uppercase tracking-widest transition-all hover:text-primary-500 relative group ${
                isActive(link.path) 
                  ? 'text-primary-500' 
                  : (scrolled || location.pathname !== '/') 
                    ? 'text-gray-900' 
                    : 'text-white/80'
              }`}
            >
              {link.name}
              <span className={`absolute -bottom-1 left-0 h-0.5 bg-primary-500 transition-all duration-300 ${isActive(link.path) ? 'w-full' : 'w-0 group-hover:w-full'}`}></span>
            </Link>
          ))}

          <Link 
            to="/commander" 
            className="btn-primary py-2.5 px-5 text-sm"
          >
            Commander
          </Link>
        </div>

        {/* Mobile Menu Toggle */}
        <div className="flex items-center gap-4 md:hidden">
            <Link to="/boutique" className="text-gray-600">
                <ShoppingBag size={24} />
            </Link>
            <button 
                onClick={() => setIsOpen(!isOpen)}
                className="text-gray-900 p-2"
            >
                {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
        </div>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-b border-gray-100 overflow-hidden"
          >
            <div className="px-4 py-6 flex flex-col gap-4">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                  className={`text-lg font-semibold ${
                    isActive(link.path) ? 'text-primary-600' : 'text-gray-600'
                  }`}
                >
                  {link.name}
                </Link>
              ))}
              <div className="pt-4 flex flex-col gap-3">
                <Link 
                  to="/commander" 
                  onClick={() => setIsOpen(false)}
                  className="btn-primary w-full"
                >
                  Commander un service
                </Link>
                <a 
                  href="tel:+221762903264" 
                  className="btn-outline w-full"
                >
                  <Phone size={18} />
                  Appeler maintenant
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}

export default Navbar
