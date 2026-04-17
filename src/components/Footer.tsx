import { Link } from 'react-router-dom'
import { Phone, Mail, MapPin, Globe, MessageCircle } from 'lucide-react'

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 py-16 px-4 md:px-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
        <div className="col-span-1 md:col-span-1">
          <Link to="/" className="flex items-center gap-2 mb-6">
            <div className="w-8 h-8 bg-primary-600 rounded flex items-center justify-center text-white font-bold text-lg">
              M
            </div>
            <span className="font-bold text-xl tracking-tight text-white">
              MOR <span className="text-primary-500">PLOMBERIE</span>
            </span>
          </Link>
          <p className="text-gray-400 mb-6 leading-relaxed">
            Votre expert en plomberie basé à <strong className="text-white">Mbour</strong>. Interventions rapides partout au <strong className="text-white">Sénégal</strong>.
          </p>
          <div className="flex gap-4">
            <a href="#" aria-label="Facebook" className="hover:text-primary-500 transition-colors"><Globe size={20} /></a>
            <a href="#" aria-label="Instagram" className="hover:text-primary-500 transition-colors"><MessageCircle size={20} /></a>
            <a href="#" aria-label="Twitter" className="hover:text-primary-500 transition-colors"><MessageCircle size={20} /></a>
          </div>
        </div>

        <div>
          <h4 className="text-white font-bold text-lg mb-6">Services</h4>
          <ul className="space-y-4">
            <li><Link to="/services" className="hover:text-white transition-colors">Installation Plomberie</Link></li>
            <li><Link to="/services" className="hover:text-white transition-colors">Réparation de Fuites</Link></li>
            <li><Link to="/services" className="hover:text-white transition-colors">Débouchage Canalisation</Link></li>
            <li><Link to="/services" className="hover:text-white transition-colors">Maintenance Chauffe-eau</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-bold text-lg mb-6">Liens Rapides</h4>
          <ul className="space-y-4">
            <li><Link to="/boutique" className="hover:text-white transition-colors">Boutique</Link></li>
            <li><Link to="/commander" className="hover:text-white transition-colors">Commander</Link></li>
            <li><Link to="/a-propos" className="hover:text-white transition-colors">À Propos</Link></li>
            <li><Link to="/contact" className="hover:text-white transition-colors">Contact</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-bold text-lg mb-6">Contact</h4>
          <ul className="space-y-4">
            <li className="flex items-center gap-3">
              <Phone size={18} className="text-primary-500" />
              <a href="tel:+221762903264" className="hover:text-white transition-colors">+221 76-290-32-64</a>
            </li>
            <li className="flex items-center gap-3">
              <Mail size={18} className="text-primary-500" />
              <a href="mailto:morsyllaplomberie64@gmail.com" className="hover:text-white transition-colors text-sm">morsyllaplomberie64@gmail.com</a>
            </li>
            <li className="flex items-center gap-3">
              <MapPin size={22} className="text-primary-500" />
              <span>Mbour — Tout le Sénégal</span>
            </li>
          </ul>
        </div>
      </div>
      <div className="max-w-7xl mx-auto pt-12 mt-12 border-t border-gray-800">
        {/* Developer Credit — Publicité */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-8 p-6 bg-white/5 rounded-3xl border border-white/10">
          <div className="text-center md:text-left">
            <p className="text-xs uppercase tracking-[0.2em] text-primary-400 font-bold mb-1">Site conçu et développé par</p>
            <p className="text-white font-black text-2xl">Malick</p>
            <p className="text-gray-400 text-sm">Développeur Web Full-Stack • Solutions Digitales au Sénégal</p>
          </div>
          <a
            href="tel:+221771719013"
            className="flex items-center gap-3 bg-primary-600 hover:bg-primary-700 text-white px-8 py-4 rounded-2xl font-bold text-lg shadow-lg shadow-primary-600/30 transition-all hover:-translate-y-0.5 shrink-0"
          >
            <Phone size={20} /> +221 77-171-90-13
          </a>
        </div>
        <p className="text-center text-sm text-gray-600">&copy; {new Date().getFullYear()} MOR Plomberie. Tous droits réservés.</p>
      </div>
    </footer>
  )
}

export default Footer
