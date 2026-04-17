import { motion, AnimatePresence } from 'framer-motion'
import { ShoppingBag, Trash2, Plus, Minus, ArrowLeft, MessageCircle, ShoppingCart, MapPin, Loader2 } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import { useCartStore } from '../store/cartStore'
import api from '../services/api'
import { useState } from 'react'
import { Copy, Smartphone, Wallet, Check } from 'lucide-react'

const Cart = () => {
    const { items, removeItem, updateQuantity, clearCart, getTotal } = useCartStore()
    const navigate = useNavigate()
    const [location, setLocation] = useState<{lat: number, lng: number} | null>(null)
    const [isLocating, setIsLocating] = useState(false)
    const [isSubmitting, setIsSubmitting] = useState(false)
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
        // Wave universal link for payment (if they have a merchant account, they can use wave.me/m/ID)
        // Without ID, we just suggest opening the app or provide instructions
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
                    alert("📍 Position non détectée : Pour une livraison précise, autorisez l'accès à la position ou entrez votre adresse dans WhatsApp.")
                },
                { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
            )
        }
    }

    const handleCheckout = async () => {
        setIsSubmitting(true)
        const total = getTotal()
        
        try {
            // 1. Save to Database for Admin Tracking
            await api.post('/orders', {
                customer_name: 'Client Boutique',
                customer_phone: 'WhatsApp',
                address: location ? `LAT:${location.lat}, LNG:${location.lng}` : 'Non spécifié',
                latitude: location?.lat,
                longitude: location?.lng,
                payment_method: paymentMethod,
                total_amount: total,
                items: items.map(item => ({
                    product_id: item.product_id,
                    quantity: item.quantity,
                    price: item.price
                }))
            })

            // 2. Redirect to WhatsApp
            const phoneNumber = '221788260114'
            const methodLabel = paymentMethod === 'wave' ? '🌊 WAVE' : paymentMethod === 'orange' ? '🍊 ORANGE MONEY' : '💬 WHATSAPP'
            const itemsList = items.map(i => `• ${i.name} (×${i.quantity}) — ${(i.price * i.quantity).toLocaleString()} FCFA`).join('\n')
            const locString = location ? `\n📍 Position: https://www.google.com/maps?q=${location.lat},${location.lng}` : ''
            const adminLink = `\n\n🔐 Accéder au dashboard:\nhttps://morplombierbi.vercel.app/admin?key=MOR-PLOMBERIE-2025-SECURE`
            const text = encodeURIComponent(`🛒 *COMMANDE BOUTIQUE MOR*\n\n💳 *PAIEMENT: ${methodLabel}*\n\n${itemsList}\n\n💰 *TOTAL: ${total.toLocaleString()} FCFA*${locString}${adminLink}`)
            window.open(`https://wa.me/${phoneNumber}?text=${text}`, '_blank')
            
            // Optional: clearCart()
        } catch (error) {
            console.error('Checkout error', error)
            alert("Erreur lors de la préparation de la commande.")
        } finally {
            setIsSubmitting(false)
        }
    }

    if (items.length === 0) {
        return (
            <div className="pt-32 pb-20 min-h-[80vh] flex flex-col items-center justify-center text-center px-4">
                <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center mb-6 text-gray-300"
                >
                    <ShoppingCart size={48} />
                </motion.div>
                <h1 className="text-3xl font-black text-gray-900 mb-4">Votre panier est vide</h1>
                <p className="text-gray-500 mb-10 max-w-md">Découvrez nos équipements de plomberie haute performance dans la boutique.</p>
                <Link to="/boutique" className="btn-primary px-10 py-4 rounded-2xl">
                    Retourner à la boutique
                </Link>
            </div>
        )
    }

    return (
        <div className="pt-32 pb-20 min-h-screen bg-[#FAFBFF]">
            <div className="max-w-4xl mx-auto px-4 sm:px-6">
                <div className="flex items-center justify-between mb-10">
                    <button 
                        onClick={() => navigate('/boutique')}
                        className="flex items-center gap-2 text-gray-500 hover:text-primary-600 font-bold transition-colors"
                    >
                        <ArrowLeft size={20} />
                        Continuer mes achats
                    </button>
                    <button 
                        onClick={clearCart}
                        className="flex items-center gap-2 text-red-500 hover:text-red-600 font-bold transition-colors text-sm"
                    >
                        <Trash2 size={16} />
                        Vider le panier
                    </button>
                </div>

                <h1 className="text-4xl font-black text-gray-900 mb-12 flex items-center gap-4">
                    <ShoppingBag className="text-primary-600" size={36} />
                    Mon Panier
                </h1>

                <div className="grid grid-cols-1 gap-8">
                    {/* Items List */}
                    <div className="space-y-4">
                        <AnimatePresence mode="popLayout">
                            {items.map((item) => (
                                <motion.div
                                    key={item.product_id}
                                    layout
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: 20 }}
                                    className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 flex flex-col sm:flex-row items-center gap-6"
                                >
                                    <div className="w-24 h-24 bg-gray-50 rounded-2xl overflow-hidden flex-shrink-0">
                                        <img 
                                            src={item.image_url || '/image/seeder/pvc_fittings.png'} 
                                            alt={item.name} 
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                    <div className="flex-1 text-center sm:text-left">
                                        <h3 className="font-black text-gray-900 text-lg mb-1">{item.name}</h3>
                                        <p className="text-primary-600 font-bold">{item.price.toLocaleString()} FCFA</p>
                                    </div>
                                    
                                    <div className="flex items-center gap-4 bg-gray-50 p-2 rounded-2xl">
                                        <button 
                                            onClick={() => updateQuantity(item.product_id, item.quantity - 1)}
                                            title="Diminuer la quantité"
                                            className="w-10 h-10 rounded-xl bg-white flex items-center justify-center text-gray-600 shadow-sm hover:text-primary-600 transition-colors"
                                        >
                                            <Minus size={16} />
                                        </button>
                                        <span className="font-bold text-gray-900 w-8 text-center">{item.quantity}</span>
                                        <button 
                                            onClick={() => updateQuantity(item.product_id, item.quantity + 1)}
                                            title="Augmenter la quantité"
                                            className="w-10 h-10 rounded-xl bg-white flex items-center justify-center text-gray-600 shadow-sm hover:text-primary-600 transition-colors"
                                        >
                                            <Plus size={16} />
                                        </button>
                                    </div>

                                    <div className="text-right sm:min-w-[120px]">
                                        <div className="text-xl font-black text-gray-900">
                                            {(item.price * item.quantity).toLocaleString()} FCFA
                                        </div>
                                        <button 
                                            onClick={() => removeItem(item.product_id)}
                                            className="text-red-400 hover:text-red-600 transition-colors mt-2 text-sm font-medium"
                                        >
                                            Supprimer
                                        </button>
                                    </div>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </div>

                    {/* Summary */}
                    <div className="bg-gray-900 rounded-[2.5rem] p-10 text-white shadow-2xl relative overflow-hidden mt-8">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-primary-600/20 rounded-full -mr-32 -mt-32 blur-3xl"></div>
                        
                        <div className="relative z-10 mb-8 border-b border-white/10 pb-8">
                            <h3 className="text-xl font-bold mb-6 flex items-center gap-3">
                                <Wallet className="text-primary-400" size={24} />
                                Mode de paiement
                            </h3>
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                <button 
                                    onClick={() => setPaymentMethod('whatsapp')}
                                    className={`p-4 rounded-2xl border-2 transition-all flex items-center gap-3 ${paymentMethod === 'whatsapp' ? 'border-primary-500 bg-primary-500/10' : 'border-white/5 bg-white/5 hover:bg-white/10'}`}
                                >
                                    <MessageCircle className="text-green-400" size={20} />
                                    <div className="text-left">
                                        <div className="font-bold text-sm">WhatsApp</div>
                                        <div className="text-[10px] text-gray-500 uppercase font-black">À la livraison</div>
                                    </div>
                                </button>
                                <button 
                                    onClick={() => setPaymentMethod('wave')}
                                    className={`p-4 rounded-2xl border-2 transition-all flex items-center gap-3 ${paymentMethod === 'wave' ? 'border-blue-500 bg-blue-500/10' : 'border-white/5 bg-white/5 hover:bg-white/10'}`}
                                >
                                    <Smartphone className="text-blue-400" size={20} />
                                    <div className="text-left">
                                        <div className="font-bold text-sm">Wave</div>
                                        <div className="text-[10px] text-gray-500 uppercase font-black">Direct</div>
                                    </div>
                                </button>
                                <button 
                                    onClick={() => setPaymentMethod('orange')}
                                    className={`p-4 rounded-2xl border-2 transition-all flex items-center gap-3 ${paymentMethod === 'orange' ? 'border-orange-500 bg-orange-500/10' : 'border-white/5 bg-white/5 hover:bg-white/10'}`}
                                >
                                    <Smartphone className="text-orange-400" size={20} />
                                    <div className="text-left">
                                        <div className="font-bold text-sm">Orange Money</div>
                                        <div className="text-[10px] text-gray-500 uppercase font-black">Direct</div>
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
                                        className="mt-6 p-6 bg-blue-500/10 border border-blue-500/20 rounded-2xl space-y-4"
                                    >
                                        <div className="flex justify-between items-center">
                                            <p className="text-sm font-medium text-blue-100">Envoyez le total au numéro :</p>
                                            <button 
                                                onClick={handleCopyNumber}
                                                className="flex items-center gap-2 text-xs font-black bg-blue-500 text-white px-3 py-1.5 rounded-lg hover:bg-blue-600 transition-colors"
                                            >
                                                {copied ? <Check size={14} /> : <Copy size={14} />}
                                                {copied ? 'Copié !' : 'Copier'}
                                            </button>
                                        </div>
                                        <div className="text-2xl font-black text-white tracking-widest text-center py-2 bg-gray-950/50 rounded-xl border border-white/5">
                                            78 826 01 14
                                        </div>
                                        <button 
                                            onClick={openWave}
                                            className="w-full py-3 bg-white text-blue-600 font-black rounded-xl text-sm flex items-center justify-center gap-2 hover:bg-gray-100 transition-all active:scale-95"
                                        >
                                            Ouvrir l'application Wave 🌊
                                        </button>
                                    </motion.div>
                                )}

                                {paymentMethod === 'orange' && (
                                    <motion.div 
                                        initial={{ opacity: 0, height: 0 }}
                                        animate={{ opacity: 1, height: 'auto' }}
                                        exit={{ opacity: 0, height: 0 }}
                                        className="mt-6 p-6 bg-orange-500/10 border border-orange-500/20 rounded-2xl space-y-4"
                                    >
                                        <p className="text-sm font-medium text-orange-100 italic">Composez le code suivant sur votre téléphone :</p>
                                        <div className="text-xl font-black text-white text-center py-3 bg-gray-950/50 rounded-xl border border-white/5 break-all">
                                            #144#12*788260114*{getTotal()}#
                                        </div>
                                        <div className="flex justify-between items-center bg-gray-950/30 p-4 rounded-xl">
                                            <span className="text-xs text-gray-400">Numéro Marchand:</span>
                                            <span className="font-bold text-orange-400">78 826 01 14</span>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>

                        <div className="relative z-10 flex flex-col md:flex-row justify-between items-center gap-8">
                            <div>
                                <p className="text-gray-400 font-medium mb-1">Total de la commande</p>
                                <h2 className="text-4xl font-black text-white">{getTotal().toLocaleString()} <span className="text-xl text-primary-400">FCFA</span></h2>
                            </div>
                            <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
                                <button 
                                    onClick={handleGetLocation}
                                    className={`flex items-center justify-center gap-2 px-6 py-4 rounded-2xl font-bold transition-all ${
                                        location ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' : 'bg-white/10 text-white hover:bg-white/20'
                                    }`}
                                >
                                    <MapPin size={20} className={isLocating ? 'animate-bounce' : ''} />
                                    {isLocating ? 'Localisation...' : location ? 'Position OK !' : 'Ajouter ma Position GPS'}
                                </button>
                                <button 
                                    onClick={handleCheckout}
                                    disabled={isSubmitting}
                                    className="bg-green-500 hover:bg-green-600 text-white px-10 py-5 rounded-2xl font-black text-lg shadow-xl shadow-green-500/20 flex items-center justify-center gap-3 transition-all hover:-translate-y-1 disabled:opacity-50"
                                >
                                    {isSubmitting ? <Loader2 className="animate-spin" size={24} /> : <MessageCircle size={24} />}
                                    {isSubmitting ? 'Préparation...' : 'Valider sur WhatsApp'}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Cart
