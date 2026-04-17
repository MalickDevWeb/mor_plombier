import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import { MapPin, Phone, Clock, CheckCircle, Package, Loader2, Map as MapIcon, ExternalLink, MessageSquare, Smartphone } from 'lucide-react'
import api from '../../services/api'
import L from 'leaflet'

// Fix generic Leaflet icon missing issues in React
delete (L.Icon.Default.prototype as any)._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
})

const AdminOrders = () => {
    const [orders, setOrders] = useState<any[]>([])
    const [loading, setLoading] = useState(true)
    const [selectedOrder, setSelectedOrder] = useState<any | null>(null)

    useEffect(() => {
        fetchOrders()
    }, [])

    const fetchOrders = async () => {
        try {
            // using the protected admin route
            const response = await api.get('/admin/orders')
            setOrders(response.data.data)
        } catch (error) {
            console.error("Failed to fetch orders", error)
        } finally {
            setLoading(false)
        }
    }

    const updateStatus = async (id: number, status: string) => {
        try {
            await api.patch(`/admin/orders/${id}/status`, { status })
            fetchOrders()
            if (selectedOrder?.id === id) {
                setSelectedOrder({ ...selectedOrder, status })
            }
        } catch (error) {
            console.error("Failed to update status", error)
            alert("Erreur lors de la mise à jour.")
        }
    }

    const updatePaymentStatus = async (id: number, payment_status: string) => {
        try {
            await api.patch(`/admin/orders/${id}/payment-status`, { payment_status })
            fetchOrders()
            if (selectedOrder?.id === id) {
                setSelectedOrder({ ...selectedOrder, payment_status })
            }
        } catch (error) {
            console.error("Failed to update payment status", error)
            alert("Erreur lors de la mise à jour du paiement.")
        }
    }

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold text-gray-900">Commandes & Interventions</h1>
                <p className="text-gray-500">Gérez les demandes clients et suivez leur localisation en temps réel.</p>
            </div>

            {loading ? (
                <div className="flex justify-center items-center h-64">
                    <Loader2 className="animate-spin text-primary-500" size={40} />
                </div>
            ) : (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Orders List */}
                    <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden flex flex-col h-[700px]">
                        <div className="p-6 border-b border-gray-100 bg-gray-50/50">
                            <h3 className="font-bold text-gray-900">Liste des requêtes ({orders.length})</h3>
                        </div>
                        <div className="flex-1 overflow-y-auto p-4 space-y-3">
                            {orders.map((order) => (
                                <div 
                                    key={order.id} 
                                    onClick={() => setSelectedOrder(order)}
                                    className={`p-4 rounded-2xl border transition-all cursor-pointer ${
                                        selectedOrder?.id === order.id 
                                        ? 'border-primary-500 bg-primary-50 shadow-md shadow-primary-500/10' 
                                        : 'border-gray-100 bg-white hover:border-gray-300'
                                    }`}
                                >
                                    <div className="flex justify-between items-start mb-2">
                                        <div className="font-bold text-gray-900 text-sm">{order.customer_name}</div>
                                        <div className={`px-3 py-1 text-[10px] uppercase tracking-wider font-bold rounded-full ${
                                            order.status === 'pending' ? 'bg-amber-100 text-amber-600' :
                                            order.status === 'completed' ? 'bg-green-100 text-green-600' :
                                            'bg-blue-100 text-blue-600'
                                        }`}>
                                            {order.status}
                                        </div>
                                    </div>
                                    <div className="flex items-center justify-between mt-3">
                                        <div className="flex items-center gap-2 text-xs text-gray-500">
                                            <Phone size={12} /> {order.customer_phone}
                                        </div>
                                        <div className="flex items-center gap-2">
                                            {order.payment_method === 'wave' ? <div className="p-1.5 bg-blue-50 text-blue-500 rounded-lg" title="Wave"><Smartphone size={14} /></div> :
                                             order.payment_method === 'orange' ? <div className="p-1.5 bg-orange-50 text-orange-500 rounded-lg" title="Orange Money"><Smartphone size={14} /></div> :
                                             <div className="p-1.5 bg-green-50 text-green-500 rounded-lg" title="WhatsApp/Cash"><MessageSquare size={14} /></div>}
                                            
                                            {order.payment_status === 'paid' && (
                                                <div className="p-1.5 bg-emerald-50 text-emerald-500 rounded-lg" title="Payé">
                                                    <CheckCircle size={14} />
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2 text-[10px] text-gray-400 mt-2">
                                        <Clock size={10} /> {new Date(order.created_at).toLocaleString('fr-FR')}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Order Detail & Map */}
                    <div className="bg-white rounded-3xl border border-gray-100 shadow-sm h-[700px] flex flex-col relative overflow-hidden">
                        <AnimatePresence mode="wait">
                            {selectedOrder ? (
                                <motion.div 
                                    key="detail"
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    className="flex flex-col h-full"
                                >
                                    {/* Map Header */}
                                    <div className="h-64 bg-gray-100 relative">
                                        {selectedOrder.latitude && selectedOrder.longitude ? (
                                            <MapContainer 
                                                center={[selectedOrder.latitude, selectedOrder.longitude]} 
                                                zoom={15} 
                                                style={{ height: "100%", width: "100%" }}
                                            >
                                                <TileLayer
                                                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                                />
                                                <Marker position={[selectedOrder.latitude, selectedOrder.longitude]}>
                                                    <Popup>
                                                        Client: {selectedOrder.customer_name}
                                                    </Popup>
                                                </Marker>
                                            </MapContainer>
                                        ) : (
                                            <div className="w-full h-full flex flex-col items-center justify-center text-gray-400">
                                                <MapPin size={48} className="mb-2 opacity-50" />
                                                <p className="text-sm font-medium">Position GPS non fournie</p>
                                            </div>
                                        )}
                                        {selectedOrder.latitude && selectedOrder.longitude && (
                                            <a 
                                                href={`https://www.google.com/maps?q=${selectedOrder.latitude},${selectedOrder.longitude}`}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="absolute top-4 right-4 z-[1000] bg-white p-3 rounded-2xl shadow-xl border border-gray-100 flex items-center gap-2 font-bold text-gray-900 hover:bg-gray-50 transition-all active:scale-95"
                                            >
                                                <MapIcon size={18} className="text-primary-600" />
                                                Navigation Google Maps
                                                <ExternalLink size={14} className="text-gray-400" />
                                            </a>
                                        )}
                                    </div>

                                    {/* Order Content */}
                                    <div className="flex-1 p-8 overflow-y-auto">
                                        <div className="flex justify-between items-start mb-6">
                                            <div>
                                                <h2 className="text-2xl font-black text-gray-900 mb-1">{selectedOrder.customer_name}</h2>
                                                <p className="text-gray-500 font-medium flex items-center gap-2">
                                                    <Phone size={16} /> {selectedOrder.customer_phone}
                                                </p>
                                            </div>
                                            <div className="text-right">
                                                <div className="text-sm font-bold text-gray-900">Total</div>
                                                <div className="text-xl font-black text-primary-600">{Number(selectedOrder.total_amount).toLocaleString()} FCFA</div>
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                                            <div className="bg-gray-50 p-4 rounded-2xl border border-gray-100">
                                                <h4 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Mode de Paiement</h4>
                                                <div className="flex items-center gap-2 font-black text-gray-900 uppercase text-xs">
                                                    {selectedOrder.payment_method === 'wave' ? <span className="text-blue-500">🌊 Wave</span> : 
                                                     selectedOrder.payment_method === 'orange' ? <span className="text-orange-500">🍊 Orange Money</span> : 
                                                     <span className="text-green-500">💬 WhatsApp / Espèces</span>}
                                                </div>
                                            </div>
                                            <div className="bg-gray-50 p-4 rounded-2xl border border-gray-100 flex justify-between items-center group">
                                                <div>
                                                    <h4 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Statut Paiement</h4>
                                                    <div className="flex items-center gap-2 font-black text-gray-900 uppercase text-xs">
                                                        {selectedOrder.payment_status === 'paid' ? <span className="text-emerald-500 flex items-center gap-1"><CheckCircle size={12}/> Payé</span> : 
                                                        <span className="text-amber-500 flex items-center gap-1"><Clock size={12}/> En attente</span>}
                                                    </div>
                                                </div>
                                                <button 
                                                    onClick={() => updatePaymentStatus(selectedOrder.id, selectedOrder.payment_status === 'paid' ? 'pending' : 'paid')}
                                                    className={`px-3 py-1.5 rounded-xl text-[10px] font-black transition-all ${
                                                        selectedOrder.payment_status === 'paid' 
                                                        ? 'bg-amber-100 text-amber-600 hover:bg-amber-200' 
                                                        : 'bg-emerald-100 text-emerald-600 hover:bg-emerald-200'
                                                    }`}
                                                >
                                                    {selectedOrder.payment_status === 'paid' ? 'Marquer Impayé' : 'Marquer Payé'}
                                                </button>
                                            </div>
                                        </div>

                                        <div className="mb-8">
                                            <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">Adresse / Détails</h4>
                                            <div className="bg-gray-50 p-4 rounded-2xl text-sm font-medium text-gray-700">
                                                {selectedOrder.address || 'Aucune adresse précisée'}
                                            </div>
                                        </div>

                                        <div className="mb-8">
                                            <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">Articles demandés</h4>
                                            <div className="space-y-3">
                                                {selectedOrder.items?.map((item: any) => (
                                                    <div key={item.id} className="flex justify-between items-center bg-gray-50 p-4 rounded-2xl border border-gray-100">
                                                        <div className="flex items-center gap-3">
                                                            <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-sm text-gray-400">
                                                                <Package size={20} />
                                                            </div>
                                                            <div>
                                                                <div className="font-bold text-sm text-gray-900">
                                                                    {item.product?.name || item.service?.name || "Article inconnu"}
                                                                </div>
                                                                <div className="text-xs text-gray-500">Quantité: {item.quantity}</div>
                                                            </div>
                                                        </div>
                                                        <div className="font-bold text-sm text-gray-900">
                                                            {Number(item.price).toLocaleString()} F
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Action Footer */}
                                    <div className="p-6 bg-white border-t border-gray-100 flex gap-4">
                                        <button 
                                            onClick={() => updateStatus(selectedOrder.id, 'completed')}
                                            className="flex-1 btn-primary py-3"
                                            disabled={selectedOrder.status === 'completed'}
                                            title="Marquer comme terminé"
                                        >
                                            <CheckCircle size={18} /> Marquer Terminé
                                        </button>
                                        <a 
                                            href={`https://wa.me/221${selectedOrder.customer_phone.replace(/[^0-9]/g, '')}`} 
                                            target="_blank" 
                                            rel="noopener noreferrer"
                                            className="flex-1 btn-outline bg-gray-50 py-3 font-bold"
                                        >
                                            <MessageSquare size={18} /> Contacter
                                        </a>
                                    </div>
                                </motion.div>
                            ) : (
                                <motion.div 
                                    key="empty"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className="flex flex-col items-center justify-center h-full text-gray-400 p-8 text-center"
                                >
                                    <div className="w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center mb-6">
                                        <MapPin size={40} className="opacity-20" />
                                    </div>
                                    <h3 className="text-lg font-bold text-gray-900 mb-2">Sélectionnez une commande</h3>
                                    <p className="text-sm">Cliquez sur une commande dans la liste de gauche pour voir les détails de l'intervention et la position GPS du client.</p>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>
            )}
        </div>
    )
}

export default AdminOrders
