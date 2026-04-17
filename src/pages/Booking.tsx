import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MapPin, Phone, User, MessageSquare, Calendar, Send, Loader2, Wallet, Smartphone, MessageCircle, Copy, Check } from 'lucide-react'
import api from '../services/api'

const Booking = () => {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [services, setServices] = useState<any[]>([])
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    service_id: '',
    service_name: '',
    description: '',
    date: '',
    time: ''
  })

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await api.get('/services')
        setServices(response.data.data)
      } catch (err) {
        console.error('Failed to fetch services', err)
      }
    }
    fetchServices()
  }, [])

  // Simulate Map/Location
  const [location, setLocation] = useState<{lat: number, lng: number} | null>(null)
  const [isLocating, setIsLocating] = useState(false)
  const [paymentMethod, setPaymentMethod] = useState<'whatsapp' | 'wave' | 'orange'>('whatsapp')
  const [copied, setCopied] = useState(false)

  const ADMIN_PHONE = '788260114'

  const handleCopyNumber = () => {
    navigator.clipboard.writeText(ADMIN_PHONE)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const openWave = () => {
    handleCopyNumber()
    window.open('https://wave.com/pay', '_blank')
  }

  const handleGetLocation = () => {
    setIsLocating(true)
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          })
          setIsLocating(false)
        },
        () => {
          setIsLocating(false)
          alert("📍 Position non détectée : Pour nous aider à vous trouver plus vite, autorisez l'accès à la position dans votre navigateur ou entrez votre adresse manuellement dans la description.")
        },
        { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
      )
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // 1. Save to Database
      await api.post('/orders', {
        customer_name: formData.name,
        customer_phone: formData.phone,
        address: location ? `LAT:${location.lat}, LNG:${location.lng}` : 'Non spécifié',
        latitude: location?.lat,
        longitude: location?.lng,
        payment_method: paymentMethod,
        items: [
          {
            service_id: formData.service_id,
            quantity: 1,
            price: 0 // Price will be quoted later
          }
        ]
      })

      // 2. Redirect to WhatsApp
      const phoneNumber = '221788260114'
      const methodLabel = paymentMethod === 'wave' ? '🌊 WAVE' : paymentMethod === 'orange' ? '🍊 ORANGE MONEY' : '💬 WHATSAPP'
      const locString = location ? `\n📍 Position: https://www.google.com/maps?q=${location.lat},${location.lng}` : ''
      const adminLink = `\n\n🔐 Accéder au dashboard:\nhttps://morplombierbi.vercel.app/admin?key=MOR-PLOMBERIE-2025-SECURE`
      const text = encodeURIComponent(
        `🔔 NOUVELLE COMMANDE\n\n💳 *PAIEMENT: ${methodLabel}*\n\n👤 ${formData.name}\n📞 ${formData.phone}\n🛠 ${formData.service_name}\n📝 ${formData.description}\n📅 ${formData.date} à ${formData.time}${locString}${adminLink}`
      )
      window.open(`https://wa.me/${phoneNumber}?text=${text}`, '_blank')
      
      alert("Commande envoyée avec succès !")
    } catch (error) {
      console.error('Order error', error)
      alert("Erreur lors de l'envoi de la commande. Veuillez réessayer.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="pt-24 pb-20 bg-gray-50 min-h-screen">
      <div className="max-w-4xl mx-auto px-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="heading-2 mb-4 font-black">Commander un <span className="text-gradient">Service</span></h1>
          <p className="text-gray-600 font-medium">
            Remplissez ce formulaire pour une intervention rapide.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-2">
                <motion.form 
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    onSubmit={handleSubmit}
                    className="glass-card p-10 space-y-6"
                >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-sm font-bold text-gray-700 ml-1">Nom complet</label>
                            <div className="relative">
                                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                                <input 
                                    required
                                    type="text" 
                                    className="w-full pl-12 pr-4 py-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-primary-500 transition-all font-medium"
                                    placeholder="Ex: Moussa Diop"
                                    onChange={e => setFormData({...formData, name: e.target.value})}
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
                                    className="w-full pl-12 pr-4 py-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-primary-500 transition-all font-medium"
                                    placeholder="Ex: 77 000 00 00"
                                    onChange={e => setFormData({...formData, phone: e.target.value})}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-bold text-gray-700 ml-1">Type de service</label>
                        <select 
                            required
                            aria-label="Type de service"
                            className="w-full px-4 py-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-primary-500 transition-all font-medium appearance-none"
                            onChange={e => {
                                const s = services.find(srv => srv.id === parseInt(e.target.value))
                                setFormData({...formData, service_id: e.target.value, service_name: s?.title || ''})
                            }}
                        >
                            <option value="">Sélectionnez un service</option>
                            {services.map(s => (
                                <option key={s.id} value={s.id}>{s.title}</option>
                            ))}
                            <option value="Autre">Autre besoin</option>
                        </select>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-bold text-gray-700 ml-1">Description du problème</label>
                        <div className="relative">
                            <MessageSquare className="absolute left-4 top-4 text-gray-400" size={20} />
                            <textarea 
                                rows={4}
                                className="w-full pl-12 pr-4 py-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-primary-500 transition-all font-medium"
                                placeholder="Dites-nous en plus sur votre besoin..."
                                onChange={e => setFormData({...formData, description: e.target.value})}
                            ></textarea>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-sm font-bold text-gray-700 ml-1">Date souhaitée</label>
                            <div className="relative">
                                <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                                <input 
                                    type="date" 
                                    aria-label="Date souhaitée"
                                    className="w-full pl-12 pr-4 py-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-primary-500 transition-all font-medium"
                                    onChange={e => setFormData({...formData, date: e.target.value})}
                                />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-bold text-gray-700 ml-1">Heure souhaitée</label>
                            <input 
                                type="time" 
                                aria-label="Heure souhaitée"
                                className="w-full px-4 py-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-primary-500 transition-all font-medium"
                                onChange={e => setFormData({...formData, time: e.target.value})}
                            />
                        </div>
                    </div>

                    <div className="space-y-4 pt-4 border-t border-gray-100">
                        <label className="text-sm font-bold text-gray-700 ml-1 flex items-center gap-2">
                            <Wallet size={16} className="text-primary-500" />
                            Mode de paiement souhaité
                        </label>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                            <button 
                                type="button"
                                onClick={() => setPaymentMethod('whatsapp')}
                                className={`p-4 rounded-2xl border-2 transition-all flex items-center gap-3 ${paymentMethod === 'whatsapp' ? 'border-primary-500 bg-primary-50' : 'border-gray-100 bg-white hover:border-gray-200'}`}
                            >
                                <MessageCircle className="text-green-500" size={20} />
                                <div className="text-left">
                                    <div className="font-bold text-xs">WhatsApp</div>
                                    <div className="text-[9px] text-gray-400 uppercase font-black">Après service</div>
                                </div>
                            </button>
                            <button 
                                type="button"
                                onClick={() => setPaymentMethod('wave')}
                                className={`p-4 rounded-2xl border-2 transition-all flex items-center gap-3 ${paymentMethod === 'wave' ? 'border-blue-500 bg-blue-50' : 'border-gray-100 bg-white hover:border-gray-200'}`}
                            >
                                <Smartphone className="text-blue-500" size={20} />
                                <div className="text-left">
                                    <div className="font-bold text-xs">Wave</div>
                                    <div className="text-[9px] text-gray-400 uppercase font-black">Direct</div>
                                </div>
                            </button>
                            <button 
                                type="button"
                                onClick={() => setPaymentMethod('orange')}
                                className={`p-4 rounded-2xl border-2 transition-all flex items-center gap-3 ${paymentMethod === 'orange' ? 'border-orange-500 bg-orange-50' : 'border-gray-100 bg-white hover:border-gray-200'}`}
                            >
                                <Smartphone className="text-orange-500" size={20} />
                                <div className="text-left">
                                    <div className="font-bold text-xs">OM</div>
                                    <div className="text-[9px] text-gray-400 uppercase font-black">Direct</div>
                                </div>
                            </button>
                        </div>

                        {/* Payment Instructions */}
                        <AnimatePresence mode="wait">
                            {paymentMethod === 'wave' && (
                                <motion.div 
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: 'auto' }}
                                    exit={{ opacity: 0, height: 0 }}
                                    className="p-5 bg-blue-50 border border-blue-100 rounded-2xl space-y-3"
                                >
                                    <div className="flex justify-between items-center">
                                        <p className="text-xs font-medium text-blue-700">Numéro Wave :</p>
                                        <button 
                                            type="button"
                                            onClick={handleCopyNumber}
                                            className="flex items-center gap-2 text-[10px] font-black bg-blue-500 text-white px-3 py-1.5 rounded-lg"
                                        >
                                            {copied ? <Check size={12} /> : <Copy size={12} />}
                                            {copied ? 'Copié' : 'Copier'}
                                        </button>
                                    </div>
                                    <div className="text-lg font-black text-blue-900 text-center py-2 bg-white rounded-xl border border-blue-200">
                                        78 826 01 14
                                    </div>
                                    <button 
                                        type="button"
                                        onClick={openWave}
                                        className="w-full py-3 bg-blue-600 text-white font-black rounded-xl text-xs flex items-center justify-center gap-2"
                                    >
                                        Ouvrir Wave 🌊
                                    </button>
                                </motion.div>
                            )}

                            {paymentMethod === 'orange' && (
                                <motion.div 
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: 'auto' }}
                                    exit={{ opacity: 0, height: 0 }}
                                    className="p-5 bg-orange-50 border border-orange-100 rounded-2xl space-y-3"
                                >
                                    <p className="text-xs font-medium text-orange-700">Code USSD à composer :</p>
                                    <div className="text-md font-black text-orange-900 text-center py-3 bg-white rounded-xl border border-orange-200">
                                        #144#12*788260114*MONTANT#
                                    </div>
                                    <p className="text-[10px] text-orange-600 text-center italic">Remplacez MONTANT par le prix convenu.</p>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    <div className="pt-4 flex flex-col gap-4">
                        <button 
                            type="button" 
                            onClick={handleGetLocation}
                            className={`flex items-center justify-center gap-2 py-4 rounded-2xl font-bold transition-all ${
                                location ? 'bg-accent-50 text-accent-600 border border-accent-200' : 'bg-primary-50 text-primary-600 hover:bg-primary-100'
                            }`}
                        >
                            <MapPin size={22} className={isLocating ? 'animate-bounce' : ''} />
                            {isLocating ? 'Localisation en cours...' : location ? 'Position enregistrée !' : 'Ajouter ma position GPS'}
                        </button>
                        
                        <button 
                            type="submit" 
                            disabled={isSubmitting}
                            className="btn-primary py-5 text-xl disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {isSubmitting ? (
                                <Loader2 size={22} className="animate-spin" />
                            ) : (
                                <Send size={22} />
                            )}
                            {isSubmitting ? 'Envoi en cours...' : 'Envoyer la commande (WhatsApp)'}
                        </button>
                    </div>
                </motion.form>
            </div>

            <div className="space-y-8">
                <div className="bg-primary-600 p-8 rounded-[2rem] text-white shadow-xl relative overflow-hidden">
                    <div className="absolute -right-4 -top-4 w-24 h-24 bg-white/10 rounded-full blur-2xl"></div>
                    <h3 className="text-xl font-bold mb-4">Intervention Urgente ?</h3>
                    <p className="text-primary-100 mb-6 opacity-90">
                        Pour toute urgence (fuite majeure, inondation), appelez-nous directement.
                    </p>
                    <a href="tel:+221788260114" className="block text-center py-4 bg-white text-primary-600 font-bold rounded-2xl shadow-lg">
                        +221 78 826 01 14
                    </a>
                </div>

                <div className="bg-white p-8 rounded-[2rem] shadow-lg border border-gray-100">
                    <h3 className="font-bold text-gray-900 mb-6">Comment ça marche ?</h3>
                    <div className="space-y-6">
                        {[
                            { n: '1', t: 'Remplissez le formulaire', d: 'Détails et position GPS' },
                            { n: '2', t: 'Validation WhatsApp', d: 'Chat direct avec l\'expert' },
                            { n: '3', t: 'Intervention Rapide', d: 'Arrivée sous 30-60 min' }
                        ].map(step => (
                            <div key={step.n} className="flex gap-4">
                                <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center font-bold text-primary-600">
                                    {step.n}
                                </div>
                                <div>
                                    <h4 className="font-bold text-gray-900">{step.t}</h4>
                                    <p className="text-sm text-gray-500">{step.d}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
      </div>
    </div>
  )
}

export default Booking
