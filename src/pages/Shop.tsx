import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ShoppingCart, ShoppingBag, Search, Loader2, MessageCircle } from 'lucide-react'
import { useProductStore } from '../store/productStore'
import api from '../services/api'
import { useCartStore } from '../store/cartStore'

const Shop = () => {
    const { products, isLoading, fetchProducts } = useProductStore()
    const { items: cart, addItem: addToCart, clearCart, getTotal } = useCartStore()
    const [searchTerm, setSearchTerm] = useState('')
    const [activeCategory, setActiveCategory] = useState('Tous')
    const [isCheckingOut, setIsCheckingOut] = useState(false)

    useEffect(() => {
        fetchProducts()
    }, [fetchProducts])

    // Build unique categories from real product data
    const categories = ['Tous', ...Array.from(new Set((products || []).map(p => p.category?.name).filter(Boolean)))]

    const filteredProducts = (products || []).filter(p => {
        const matchSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase())
        const matchCat = activeCategory === 'Tous' || p.category?.name === activeCategory
        return matchSearch && matchCat
    })

    const checkoutOrder = async () => {
        setIsCheckingOut(true)
        try {
            await api.post('/orders', {
                customer_name: 'Client Boutique',
                customer_phone: 'Non spécifié',
                address: 'Boutique en ligne',
                items: cart.map(item => ({
                    product_id: item.product_id,
                    quantity: item.quantity,
                    price: item.price
                }))
            })
            const phoneNumber = '221762903264'
            const itemsList = cart.map(i => `• ${i.name} (×${i.quantity}) — ${i.price.toLocaleString()} FCFA`).join('\n')
            const total = getTotal()
            const adminLink = `\n\n🔐 Accéder au dashboard:\nhttp://localhost:5174/admin/login?key=MOR-PLOMBERIE-2025-SECURE`
            const text = encodeURIComponent(`🛒 *COMMANDE BOUTIQUE MOR*\n\n${itemsList}\n\n💰 *TOTAL: ${total.toLocaleString()} FCFA*${adminLink}`)
            window.open(`https://wa.me/${phoneNumber}?text=${text}`, '_blank')
            clearCart()
        } catch (error) {
            console.error('Checkout error', error)
        } finally {
            setIsCheckingOut(false)
        }
    }

    return (
        <div className="pt-24 pb-32 min-h-screen bg-[#FAFBFF]">
            {/* Header */}
            <header className="relative bg-gray-900 py-24 px-4 overflow-hidden">
                <div className="absolute inset-0">
                    <img src="/image/seeder/pvc_fittings.png" alt="Boutique" className="w-full h-full object-cover opacity-15" />
                    <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-primary-900/50 to-gray-900"></div>
                </div>
                <div className="max-w-7xl mx-auto relative z-10 flex flex-col md:flex-row justify-between items-center gap-8">
                    <div className="text-white text-center md:text-left">
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-primary-600/20 border border-primary-500/30 rounded-full text-primary-300 text-xs font-bold uppercase tracking-widest mb-4">
                            Matériel Pro & Grand Public
                        </div>
                        <h1 className="text-4xl md:text-6xl font-black mb-3 leading-tight">La Boutique <span className="text-gradient">MOR</span></h1>
                        <p className="text-gray-300 text-lg font-outfit">Équipements de plomberie haute performance — Mbour & tout le Sénégal.</p>
                    </div>
                    <div className="flex bg-white/10 backdrop-blur-md border border-white/20 p-2 rounded-2xl w-full md:w-auto min-w-[320px]">
                        <div className="pl-4 pr-2 flex items-center text-white/60"><Search size={20} /></div>
                        <input
                            type="text"
                            placeholder="Rechercher un produit..."
                            className="bg-transparent border-none focus:ring-0 py-3 w-full font-medium text-white placeholder-white/40"
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                </div>
            </header>

            {/* Category Filter Tabs */}
            <div className="max-w-7xl mx-auto px-4 md:px-8 py-8">
                <div className="flex gap-3 flex-wrap">
                    {categories.map(cat => (
                        <button
                            key={cat}
                            onClick={() => setActiveCategory(cat)}
                            className={`px-6 py-3 rounded-2xl font-bold text-sm transition-all duration-300 ${
                                activeCategory === cat
                                    ? 'bg-primary-600 text-white shadow-lg shadow-primary-600/30 scale-105'
                                    : 'bg-white text-gray-600 border border-gray-200 hover:border-primary-400 hover:text-primary-600'
                            }`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>
            </div>

            {/* Product Grid */}
            <section className="max-w-7xl mx-auto px-4 md:px-8 pb-16">
                {isLoading ? (
                    <div className="flex justify-center py-32">
                        <Loader2 className="animate-spin text-primary-600" size={48} />
                    </div>
                ) : filteredProducts.length > 0 ? (
                    <>
                        <p className="text-gray-500 text-sm mb-8 font-medium">{filteredProducts.length} produit{filteredProducts.length > 1 ? 's' : ''} trouvé{filteredProducts.length > 1 ? 's' : ''}</p>
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={activeCategory}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0 }}
                                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
                            >
                                {filteredProducts.map((p) => (
                                    <motion.div
                                        key={p.id}
                                        whileHover={{ y: -6, scale: 1.02 }}
                                        className="group bg-white rounded-[2rem] overflow-hidden shadow-lg border border-gray-100 hover:shadow-2xl transition-all duration-400 flex flex-col"
                                    >
                                        <div className="relative h-56 overflow-hidden bg-gray-50">
                                            <img
                                                src={p.image_url || '/image/seeder/pvc_fittings.png'}
                                                alt={p.name}
                                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                            <div className="absolute top-3 left-3 bg-primary-600 text-white px-3 py-1 rounded-full text-xs font-bold shadow">
                                                {p.category?.name || 'Pro'}
                                            </div>
                                            {p.stock && p.stock < 10 && (
                                                <div className="absolute top-3 right-3 bg-orange-500 text-white px-2 py-1 rounded-full text-xs font-bold shadow">
                                                    Stock limité
                                                </div>
                                            )}
                                        </div>
                                        <div className="p-6 flex flex-col flex-grow">
                                            <h3 className="text-base font-black mb-1 text-gray-900 font-outfit leading-snug">{p.name}</h3>
                                            <p className="text-gray-500 text-xs mb-5 line-clamp-2 leading-relaxed">{p.description}</p>
                                            <div className="mt-auto flex items-center justify-between gap-2">
                                                <span className="text-xl font-black text-gray-900">{p.price.toLocaleString()} <span className="text-sm font-bold text-gray-400">FCFA</span></span>
                                                <div className="flex gap-2">
                                                    <a
                                                        href={`https://wa.me/221762903264?text=${encodeURIComponent(`Bonjour, je voudrais commander: ${p.name} à ${p.price.toLocaleString()} FCFA`)}`}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="w-10 h-10 bg-green-50 rounded-xl flex items-center justify-center text-green-600 hover:bg-green-500 hover:text-white transition-all shadow-sm"
                                                        title="Commander sur WhatsApp"
                                                    >
                                                        <MessageCircle size={16} />
                                                    </a>
                                                    <button
                                                        onClick={() => addToCart(p)}
                                                        title={`Ajouter ${p.name} au panier`}
                                                        className="w-10 h-10 bg-gray-50 rounded-xl flex items-center justify-center text-gray-700 hover:bg-primary-600 hover:text-white transition-all shadow-sm"
                                                    >
                                                        <ShoppingCart size={16} />
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}
                            </motion.div>
                        </AnimatePresence>

                        {/* Pro CTA */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="mt-24 relative overflow-hidden bg-gray-900 p-12 text-center text-white rounded-[3rem]"
                        >
                            <div className="absolute inset-0 opacity-10">
                                <img src="/image/seeder/service_chantier.png" alt="" className="w-full h-full object-cover" />
                            </div>
                            <div className="relative z-10">
                                <h2 className="text-4xl font-black mb-4">Espace <span className="text-gradient">Professionnel</span> MOR</h2>
                                <p className="text-gray-300 text-lg mb-8 max-w-2xl mx-auto font-outfit">
                                    Plombiers et entreprises de bâtiment du Sénégal : bénéficiez de tarifs préférentiels sur vos commandes en gros.
                                </p>
                                <a
                                    href="https://wa.me/221762903264?text=Bonjour%2C%20je%20suis%20un%20professionnel%20et%20je%20souhaite%20une%20offre%20en%20gros."
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-3 bg-green-500 hover:bg-green-600 px-8 py-5 rounded-2xl font-bold text-lg shadow-xl shadow-green-500/30 transition-all hover:-translate-y-1"
                                >
                                    <MessageCircle size={22} /> Commander en Gros (WhatsApp)
                                </a>
                            </div>
                        </motion.div>
                    </>
                ) : (
                    <div className="text-center py-32 text-gray-500">
                        <Search size={48} className="mx-auto mb-4 opacity-30" />
                        <p className="text-xl font-medium">Aucun produit trouvé pour « {searchTerm || activeCategory} »</p>
                    </div>
                )}
            </section>

            {/* Floating Cart */}
            {cart.length > 0 && (
                <motion.div
                    initial={{ y: 100 }}
                    animate={{ y: 0 }}
                    className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[55] w-[calc(100%-2rem)] max-w-lg bg-gray-900 text-white p-6 rounded-[2rem] shadow-2xl border border-white/10 backdrop-blur-xl"
                >
                    <div className="flex items-center justify-between gap-8">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-primary-600 rounded-2xl flex items-center justify-center text-white font-bold relative">
                                <ShoppingBag />
                                <span className="absolute -top-2 -right-2 w-6 h-6 bg-orange-500 rounded-full text-xs flex items-center justify-center border-2 border-gray-900">{cart.length}</span>
                            </div>
                            <div>
                                <div className="text-gray-400 text-xs font-medium uppercase tracking-wider">Votre panier</div>
                                <div className="font-black text-xl">{getTotal().toLocaleString()} FCFA</div>
                            </div>
                        </div>
                        <button
                            onClick={checkoutOrder}
                            disabled={isCheckingOut}
                            className="bg-green-500 hover:bg-green-600 px-6 py-3 rounded-xl font-bold flex items-center gap-2 disabled:opacity-50 transition-all shadow-lg"
                        >
                            {isCheckingOut ? <Loader2 className="animate-spin" size={20} /> : <><MessageCircle size={18} /> Commander</>}
                        </button>
                    </div>
                </motion.div>
            )}
        </div>
    )
}

export default Shop
