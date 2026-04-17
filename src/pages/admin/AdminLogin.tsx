import { useState, useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Phone, Loader2, Shield, CheckCircle, XCircle } from 'lucide-react'

// Secret token embedded in the WhatsApp order link
const MOR_ACCESS_TOKEN = 'MOR-PLOMBERIE-2025-SECURE'
const MOR_PHONE = '762903264' // +221 76-290-32-64 normalized

const AdminLogin = () => {
    const [searchParams] = useSearchParams()
    const [tokenValid, setTokenValid] = useState<boolean | null>(null)
    const [phone, setPhone] = useState('')
    const [error, setError] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const navigate = useNavigate()

    // Step 1: Validate the URL token on mount
    useEffect(() => {
        // TEMPORAIREMENT DÉSACTIVÉ POUR TEST: validation toujours vraie
        setTokenValid(true)
        
        /* 
        const urlToken = searchParams.get('key')
        if (urlToken === MOR_ACCESS_TOKEN) {
            setTokenValid(true)
        } else {
            // Wait 1s then show invalid
            setTimeout(() => setTokenValid(false), 600)
        }
        */
    }, [searchParams])

    // Step 2: Validate phone number
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setError('')
        setIsLoading(true)

        const cleaned = phone.replace(/[\s\-\+]/g, '').replace(/^221/, '')
        await new Promise(r => setTimeout(r, 700))

        if (cleaned === MOR_PHONE) {
            sessionStorage.setItem('mor_admin_auth', 'true')
            navigate('/admin', { replace: true })
        } else {
            setError('Numéro incorrect. Accès refusé.')
        }
        setIsLoading(false)
    }

    return (
        <div className="min-h-screen bg-gray-950 flex items-center justify-center px-4 relative overflow-hidden">
            <div className="absolute inset-0">
                <div className="absolute top-1/3 left-1/3 w-96 h-96 bg-primary-600/10 rounded-full blur-3xl"></div>
                <div className="absolute bottom-1/3 right-1/3 w-64 h-64 bg-primary-800/10 rounded-full blur-3xl"></div>
            </div>

            <div className="w-full max-w-sm relative z-10">
                {/* Checking token */}
                {tokenValid === null && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-center"
                    >
                        <Loader2 className="animate-spin text-primary-500 mx-auto mb-4" size={40} />
                        <p className="text-gray-400 font-outfit">Vérification du lien...</p>
                    </motion.div>
                )}

                {/* Token invalid */}
                {tokenValid === false && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="bg-gray-900 border border-red-500/20 rounded-[2.5rem] p-10 text-center shadow-2xl"
                    >
                        <XCircle className="text-red-500 mx-auto mb-4" size={48} />
                        <h1 className="text-xl font-black text-white mb-2">Lien invalide</h1>
                        <p className="text-gray-500 text-sm">
                            Cette page n'est accessible que via le lien reçu dans la commande WhatsApp.
                        </p>
                    </motion.div>
                )}

                {/* Token valid — show phone form */}
                <AnimatePresence>
                    {tokenValid === true && (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="bg-gray-900 border border-white/10 rounded-[2.5rem] p-10 shadow-2xl"
                        >
                            <div className="text-center mb-8">
                                <div className="w-16 h-16 bg-primary-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-primary-600/30">
                                    <Shield size={28} className="text-white" />
                                </div>
                                <div className="inline-flex items-center gap-2 bg-green-500/10 border border-green-500/20 px-4 py-2 rounded-full mb-4">
                                    <CheckCircle size={14} className="text-green-400" />
                                    <span className="text-green-400 text-xs font-bold uppercase tracking-wider">Lien vérifié</span>
                                </div>
                                <h1 className="text-2xl font-black text-white mb-1">Confirmez votre identité</h1>
                                <p className="text-gray-400 text-sm">Entrez votre numéro pour accéder au dashboard</p>
                            </div>

                            {error && (
                                <motion.div
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="mb-5 p-4 bg-red-500/10 border border-red-500/20 text-red-400 rounded-2xl text-sm font-medium text-center"
                                >
                                    🚫 {error}
                                </motion.div>
                            )}

                            <form onSubmit={handleSubmit} className="space-y-5">
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">
                                        Votre numéro WhatsApp
                                    </label>
                                    <div className="relative">
                                        <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                                        <input
                                            required
                                            type="tel"
                                            placeholder="+221 76-290-32-64"
                                            className="w-full pl-12 pr-4 py-4 bg-white/5 border border-white/10 rounded-2xl text-white placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all font-outfit"
                                            value={phone}
                                            onChange={e => setPhone(e.target.value)}
                                            autoFocus
                                        />
                                    </div>
                                </div>

                                <button
                                    type="submit"
                                    disabled={isLoading}
                                    className="w-full btn-primary py-4 text-base disabled:opacity-50"
                                >
                                    {isLoading
                                        ? <><Loader2 className="animate-spin" size={20} /> Vérification...</>
                                        : 'Accéder au Dashboard →'
                                    }
                                </button>
                            </form>

                            <p className="text-center text-gray-700 text-xs mt-6">
                                Accès exclusif — MOR Plomberie Admin
                            </p>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    )
}

export default AdminLogin
