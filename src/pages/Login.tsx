import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Mail, Lock, LogIn, Loader2, ArrowLeft } from 'lucide-react'
import { useAuthStore } from '../store/authStore'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const { login, isLoading } = useAuthStore()
  const navigate = useNavigate()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    try {
      await login({ email, password })
      navigate('/')
    } catch (err: any) {
      setError(err.response?.data?.message || 'Erreur lors de la connexion')
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
        className="w-full max-w-md bg-white p-10 rounded-[2.5rem] shadow-2xl border border-gray-100"
      >
        <div className="text-center mb-10">
          <div className="w-16 h-16 bg-primary-100 text-primary-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-sm">
            <LogIn size={32} />
          </div>
          <h1 className="text-3xl font-extrabold text-gray-900 mb-2">Bon retour !</h1>
          <p className="text-gray-500">Connectez-vous pour gérer vos commandes</p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-50 text-red-600 rounded-xl text-sm font-medium border border-red-100">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-bold text-gray-700 ml-1">Email</label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
              <input 
                required
                type="email" 
                placeholder="votre@email.com"
                className="w-full pl-12 pr-4 py-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-primary-500 transition-all font-medium"
                value={email}
                onChange={e => setEmail(e.target.value)}
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-bold text-gray-700 ml-1">Mot de passe</label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
              <input 
                required
                type="password" 
                placeholder="••••••••"
                className="w-full pl-12 pr-4 py-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-primary-500 transition-all font-medium"
                value={password}
                onChange={e => setPassword(e.target.value)}
              />
            </div>
          </div>

          <button 
            type="submit" 
            disabled={isLoading}
            className="w-full btn-primary py-4 text-lg shadow-lg shadow-primary-600/20 disabled:opacity-50"
          >
            {isLoading ? <Loader2 className="animate-spin" size={24} /> : 'Se connecter'}
          </button>
        </form>

        <div className="mt-8 text-center text-gray-600">
          Pas encore de compte ?{' '}
          <Link to="/register" className="text-primary-600 font-bold hover:underline">
            S'inscrire
          </Link>
        </div>
      </motion.div>
    </div>
  )
}

export default Login
