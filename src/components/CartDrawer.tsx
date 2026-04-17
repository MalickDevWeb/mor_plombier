import { motion, AnimatePresence } from 'framer-motion'
import { X, Trash2, Plus, Minus, ShoppingBag, MessageCircle, ArrowRight } from 'lucide-react'
import { useCartStore } from '../store/cartStore'
import { Link } from 'react-router-dom'

const CartDrawer = () => {
    const { items, removeItem, updateQuantity, getTotal, isOpen, setOpen } = useCartStore()

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setOpen(false)}
                        className="fixed inset-0 bg-gray-950/40 backdrop-blur-sm z-[100]"
                    />

                    {/* Drawer */}
                    <motion.div
                        initial={{ x: '100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '100%' }}
                        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                        className="fixed right-0 top-0 h-full w-full max-w-md bg-white shadow-2xl z-[101] flex flex-col"
                    >
                        {/* Header */}
                        <div className="p-6 border-b border-gray-100 flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-primary-100 text-primary-600 rounded-xl flex items-center justify-center">
                                    <ShoppingBag size={20} />
                                </div>
                                <div>
                                    <h2 className="font-black text-xl text-gray-900">Mon Panier</h2>
                                    <p className="text-xs text-gray-500 font-bold uppercase tracking-wider">{items.length} article{items.length > 1 ? 's' : ''}</p>
                                </div>
                            </div>
                            <button 
                                onClick={() => setOpen(false)}
                                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                            >
                                <X size={24} className="text-gray-400" />
                            </button>
                        </div>

                        {/* Items List */}
                        <div className="flex-1 overflow-y-auto p-6 space-y-6">
                            {items.length > 0 ? (
                                items.map((item) => (
                                    <div key={item.product_id} className="flex gap-4">
                                        <div className="w-20 h-20 bg-gray-50 rounded-2xl overflow-hidden flex-shrink-0">
                                            <img src={item.image_url || '/image/seeder/pvc_fittings.png'} alt={item.name} className="w-full h-full object-cover" />
                                        </div>
                                        <div className="flex-1">
                                            <h4 className="font-bold text-gray-900 text-sm mb-1">{item.name}</h4>
                                            <p className="text-primary-600 font-black text-sm mb-3">{item.price.toLocaleString()} F</p>
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center gap-2 bg-gray-50 p-1 rounded-lg border border-gray-100">
                                                    <button 
                                                        onClick={() => updateQuantity(item.product_id, item.quantity - 1)}
                                                        className="w-6 h-6 flex items-center justify-center text-gray-500 hover:text-primary-600"
                                                    >
                                                        <Minus size={12} />
                                                    </button>
                                                    <span className="text-xs font-bold w-4 text-center">{item.quantity}</span>
                                                    <button 
                                                        onClick={() => updateQuantity(item.product_id, item.quantity + 1)}
                                                        className="w-6 h-6 flex items-center justify-center text-gray-500 hover:text-primary-600"
                                                    >
                                                        <Plus size={12} />
                                                    </button>
                                                </div>
                                                <button 
                                                    onClick={() => removeItem(item.product_id)}
                                                    className="text-red-400 hover:text-red-500 transition-colors"
                                                >
                                                    <Trash2 size={16} />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className="h-full flex flex-col items-center justify-center text-center p-8">
                                    <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mb-4 text-gray-300">
                                        <ShoppingBag size={40} />
                                    </div>
                                    <h3 className="font-bold text-gray-900 mb-2">Votre panier est vide</h3>
                                    <p className="text-sm text-gray-500 mb-8">Découvrez nos produits pro dans la boutique.</p>
                                    <button 
                                        onClick={() => setOpen(false)}
                                        className="text-primary-600 font-bold flex items-center gap-2 hover:gap-3 transition-all"
                                    >
                                        Continuer mes achats <ArrowRight size={18} />
                                    </button>
                                </div>
                            )}
                        </div>

                        {/* Footer */}
                        {items.length > 0 && (
                            <div className="p-6 border-t border-gray-100 bg-gray-50/50 space-y-4">
                                <div className="flex items-center justify-between">
                                    <span className="text-gray-500 font-medium">Total</span>
                                    <span className="text-2xl font-black text-gray-900">{getTotal().toLocaleString()} FCFA</span>
                                </div>
                                <div className="grid grid-cols-1 gap-3">
                                    <Link 
                                        to="/panier" 
                                        onClick={() => setOpen(false)}
                                        className="btn-primary w-full py-4 text-sm"
                                    >
                                        Passer la commande <MessageCircle size={18} />
                                    </Link>
                                    <button 
                                        onClick={() => setOpen(false)}
                                        className="w-full py-3 text-gray-500 font-bold text-xs uppercase tracking-widest hover:text-gray-900 transition-colors"
                                    >
                                        Continuer mes achats
                                    </button>
                                </div>
                            </div>
                        )}
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    )
}

export default CartDrawer
