import { motion, AnimatePresence } from 'framer-motion'
import { ShoppingBag, Trash2, Plus, Minus, ArrowLeft, MessageCircle, ShoppingCart } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import { useCartStore } from '../store/cartStore'

const Cart = () => {
    const { items, removeItem, updateQuantity, clearCart, getTotal } = useCartStore()
    const navigate = useNavigate()

    const handleCheckout = () => {
        const phoneNumber = '221762903264'
        const itemsList = items.map(i => `• ${i.name} (×${i.quantity}) — ${(i.price * i.quantity).toLocaleString()} FCFA`).join('\n')
        const total = getTotal()
        const adminLink = `\n\n🔐 Accéder au dashboard:\nhttps://morplombierbi.vercel.app/admin?key=MOR-PLOMBERIE-2025-SECURE`
        const text = encodeURIComponent(`🛒 *COMMANDE BOUTIQUE MOR*\n\n${itemsList}\n\n💰 *TOTAL: ${total.toLocaleString()} FCFA*${adminLink}`)
        window.open(`https://wa.me/${phoneNumber}?text=${text}`, '_blank')
        // We don't clear the cart here in case they want to come back, or we could if preferred
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
                        <div className="relative z-10 flex flex-col md:flex-row justify-between items-center gap-8">
                            <div>
                                <p className="text-gray-400 font-medium mb-1">Total de la commande</p>
                                <h2 className="text-4xl font-black text-white">{getTotal().toLocaleString()} <span className="text-xl text-primary-400">FCFA</span></h2>
                            </div>
                            <button 
                                onClick={handleCheckout}
                                className="w-full md:w-auto bg-green-500 hover:bg-green-600 text-white px-10 py-5 rounded-2xl font-black text-lg shadow-xl shadow-green-500/20 flex items-center justify-center gap-3 transition-all hover:-translate-y-1"
                            >
                                <MessageCircle size={24} />
                                Valider sur WhatsApp
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Cart
