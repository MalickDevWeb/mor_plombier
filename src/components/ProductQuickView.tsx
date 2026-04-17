import { motion, AnimatePresence } from 'framer-motion'
import { X, ShoppingCart, MessageCircle, ShieldCheck, Truck, Clock } from 'lucide-react'
import type { Product } from '../store/productStore'
import { useCartStore } from '../store/cartStore'

interface ProductQuickViewProps {
  product: Product | null
  isOpen: boolean
  onClose: () => void
}

const ProductQuickView = ({ product, isOpen, onClose }: ProductQuickViewProps) => {
  const { addItem: addToCart, setOpen: setCartOpen } = useCartStore()

  if (!product) return null

  const handleAddToCart = () => {
    addToCart(product)
    onClose()
    setCartOpen(true)
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] cursor-pointer"
          />

          {/* Modal Container */}
          <div className="fixed inset-0 flex items-center justify-center z-[101] pointer-events-none p-4 md:p-8">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="bg-white rounded-[2.5rem] shadow-2xl overflow-hidden w-full max-w-5xl pointer-events-auto flex flex-col md:flex-row max-h-[90vh] relative"
            >
              {/* Close Button */}
              <button
                onClick={onClose}
                aria-label="Fermer"
                className="absolute top-6 right-6 p-2 bg-gray-100 hover:bg-gray-200 text-gray-500 hover:text-gray-900 rounded-full transition-colors z-10"
              >
                <X size={20} />
              </button>

              {/* Image Section */}
              <div className="md:w-1/2 bg-gray-50 relative group">
                <img
                  src={product.image_url || '/image/seeder/pvc_fittings.png'}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                <div className="absolute bottom-6 left-6">
                   <span className="px-4 py-2 bg-primary-600 text-white rounded-full text-xs font-bold uppercase tracking-widest shadow-lg">
                    {product.category?.name || 'Pro'}
                  </span>
                </div>
              </div>

              {/* Content Section */}
              <div className="md:w-1/2 p-8 md:p-12 overflow-y-auto flex flex-col">
                <div className="mb-8">
                  <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-3 font-outfit leading-tight">
                    {product.name}
                  </h2>
                  <div className="flex items-center gap-4">
                    <span className="text-3xl font-black text-primary-600">
                      {product.price.toLocaleString()} <span className="text-lg font-bold text-primary-600/60 uppercase">FCFA</span>
                    </span>
                    {product.stock && (
                      <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                        product.stock > 10 ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'
                      }`}>
                        {product.stock > 10 ? 'En stock' : `Plus que ${product.stock} articles`}
                      </span>
                    )}
                  </div>
                </div>

                <div className="prose prose-sm text-gray-600 mb-8 leading-relaxed max-w-none">
                  <p>{product.description}</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
                  <div className="flex flex-col items-center text-center p-4 bg-gray-50 rounded-2xl">
                    <Truck size={24} className="text-primary-500 mb-2" />
                    <span className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">Livraison</span>
                    <span className="text-xs font-bold text-gray-900">Rapide (Dakar/Mbour)</span>
                  </div>
                  <div className="flex flex-col items-center text-center p-4 bg-gray-50 rounded-2xl">
                    <ShieldCheck size={24} className="text-primary-500 mb-2" />
                    <span className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">Garantie</span>
                    <span className="text-xs font-bold text-gray-900">Produit certifié MOR</span>
                  </div>
                  <div className="flex flex-col items-center text-center p-4 bg-gray-50 rounded-2xl">
                    <Clock size={24} className="text-primary-500 mb-2" />
                    <span className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">Disponibilité</span>
                    <span className="text-xs font-bold text-gray-900">7j/7 Support Client</span>
                  </div>
                </div>

                <div className="mt-auto flex flex-col sm:flex-row gap-4">
                  <button
                    onClick={handleAddToCart}
                    className="flex-1 bg-gray-900 hover:bg-primary-600 text-white py-5 px-8 rounded-2xl font-bold flex items-center justify-center gap-3 transition-all transform hover:-translate-y-1 shadow-xl shadow-gray-900/20 active:scale-95"
                  >
                    <ShoppingCart size={20} />
                    Ajouter au Panier
                  </button>
                  <a
                    href={`https://wa.me/221788260114?text=${encodeURIComponent(`Bonjour, je voudrais commander: ${product.name} à ${product.price.toLocaleString()} FCFA`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 bg-green-500 hover:bg-green-600 text-white py-5 px-8 rounded-2xl font-bold flex items-center justify-center gap-3 transition-all transform hover:-translate-y-1 shadow-xl shadow-green-500/20 active:scale-95"
                  >
                    <MessageCircle size={20} />
                    WhatsApp
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  )
}

export default ProductQuickView
