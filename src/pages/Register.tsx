import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Mail, Lock, User, UserPlus, Loader2, ArrowLeft, Phone } from 'lucide-react'
import { useAuthStore } from '../store/authStore'

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: ''
  })
  const [error, setError] = useState('')
  const { register, isLoading } = useAuthStore()
  const navigate = useNavigate()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    
    if (formData.password !== formData.confirmPassword) {
      return setError('Les mots de passe ne correspondent pas')
    }

    try {
      await register({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        password: formData.password
      })
      navigate('/')
    } catch (err: any) {
      setError(err.response?.data?.message || 'Erreur lors de l’inscription')
    }
  }

  return (
    <div className="min-h-screen pt-24 pb-12 bg-gray-50 flex items-center justify-center px-4">
      <Link to="/" className="absolute top-8 left-8 flex items-center gap-2 text-gray-600 hover:text-primary-600 font-medium transition-colors">
        <ArrowLeft size={20} /> Retour
      </Link>

      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-lg bg-white p-10 rounded-[2.5rem] shadow-2xl border border-gray-100"
      >
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-primary-100 text-primary-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <UserPlus size={32} />
          </div>
          <h1 className="text-3xl font-extrabold text-gray-900 mb-2">Créer un compte</h1>
          <p className="text-gray-500">Rejoignez MOR Plomberie pour suivre vos interventions</p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-50 text-red-600 rounded-xl text-sm font-medium border border-red-100">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-bold text-gray-700 ml-1">Nom complet</label>
            <div className="relative">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
              <input 
                required
                type="text" 
                placeholder="Ex: Moussa Diop"
                className="w-full pl-12 pr-4 py-3.5 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-primary-500 transition-all font-medium"
                value={formData.name}
                onChange={e => setFormData({...formData, name: e.target.value})}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
                <label className="text-sm font-bold text-gray-700 ml-1">Email</label>
                <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                <input 
                    required
                    type="email" 
                    placeholder="votre@email.com"
                    className="w-full pl-12 pr-4 py-3.5 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-primary-500 transition-all font-medium"
                    value={formData.email}
                    onChange={e => setFormData({...formData, email: e.target.value})}
                />
                </div>
            </div>
            <div className="space-y-2">
                <label className="text-sm font-bold text-gray-700 ml-1">Téléphone</label>
                <div className="relative">
                <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                <input 
                    required
                    type="tel" 
                    placeholder="77 000 00 00"
                    className="w-full pl-12 pr-4 py-3.5 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-primary-500 transition-all font-medium"
                    value={formData.phone}
                    onChange={e => setFormData({...formData, phone: e.target.value})}
                />
                </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
                <label className="text-sm font-bold text-gray-700 ml-1">Mot de passe</label>
                <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                <input 
                    required
                    type="password" 
                    placeholder="••••••••"
                    className="w-full pl-12 pr-4 py-3.5 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-primary-500 transition-all font-medium"
                    value={formData.password}
                    onChange={e => setFormData({...formData, password: e.target.value})}
                />
                </div>
            </div>
            <div className="space-y-2">
                <label className="text-sm font-bold text-gray-700 ml-1">Confirmer</label>
                <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                <input 
                    required
                    type="password" 
                    placeholder="••••••••"
                    className="w-full pl-12 pr-4 py-3.5 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-primary-500 transition-all font-medium"
                    value={formData.confirmPassword}
                    onChange={e => setFormData({...formData, confirmPassword: e.target.value})}
                />
                </div>
            </div>
          </div>

          <button 
            type="submit" 
            disabled={isLoading}
            className="w-full btn-primary py-4 text-lg shadow-lg shadow-primary-600/20 disabled:opacity-50 mt-4"
          >
            {isLoading ? <Loader2 className="animate-spin" size={24} /> : 'S\'inscrire'}
          </button>
        </form>

        <div className="mt-8 text-center text-gray-600">
          Déjà un compte ?{' '}
          <Link to="/login" className="text-primary-600 font-bold hover:underline">
            Se connecter
          </Link>
        </div>
      </motion.div>
    </div>
  )
}

export default Register
