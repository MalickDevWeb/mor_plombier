import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { ShoppingBag, TrendingUp, Clock, Loader2 } from 'lucide-react'
import api from '../../services/api'

const Dashboard = () => {
    const [stats, setStats] = useState<any>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const response = await api.get('/admin/stats')
                setStats(response.data)
            } catch (error) {
                console.error("Failed to fetch dashboard stats", error)
            } finally {
                setLoading(false)
            }
        }
        fetchStats()
    }, [])

    if (loading) {
        return (
            <div className="flex justify-center items-center h-64">
                <Loader2 className="animate-spin text-primary-500" size={40} />
            </div>
        )
    }

    const statCards = [
        { name: 'Total Commandes', value: stats?.total_orders || 0, icon: <ShoppingBag />, color: 'bg-blue-500' },
        { name: 'Produits Shop', value: stats?.total_products || 0, icon: <ShoppingBag />, color: 'bg-purple-500' },
        { name: 'En attente', value: stats?.pending_orders || 0, icon: <Clock />, color: 'bg-amber-500' },
        { name: 'Chiffre d\'Affaire', value: `${(stats?.total_revenue || 0).toLocaleString()} F`, icon: <TrendingUp />, color: 'bg-emerald-500' },
    ]

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-2xl font-bold text-gray-900">Bienvenue sur votre Dashboard</h1>
                <p className="text-gray-500">Aperçu de l'activité réelle de MOR Plomberie.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {statCards.map((stat, i) => (
                    <motion.div
                        key={stat.name}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm flex items-center gap-4"
                    >
                        <div className={`w-12 h-12 ${stat.color} rounded-2xl flex items-center justify-center text-white shadow-lg`}>
                            {stat.icon}
                        </div>
                        <div>
                            <div className="text-sm font-medium text-gray-500">{stat.name}</div>
                            <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                        </div>
                    </motion.div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 bg-white rounded-3xl border border-gray-100 shadow-sm p-8">
                    <h3 className="text-lg font-bold mb-6">Dernières Commandes</h3>
                    <div className="space-y-6">
                        {stats?.recent_orders?.length > 0 ? (
                            stats.recent_orders.map((order: any) => (
                                <div key={order.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl">
                                    <div className="flex items-center gap-4">
                                        <div className="w-10 h-10 bg-primary-100 rounded-xl flex items-center justify-center text-primary-600">
                                            <Clock size={20} />
                                        </div>
                                        <div>
                                            <div className="font-bold text-gray-900 text-sm">
                                                {order.items?.[0]?.product?.name || order.items?.[0]?.service?.name || 'Commande'}
                                            </div>
                                            <div className="text-xs text-gray-500">
                                                Client: {order.customer_name} • {new Date(order.created_at).toLocaleDateString()}
                                            </div>
                                        </div>
                                    </div>
                                    <div className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                                        order.status === 'pending' ? 'bg-amber-100 text-amber-600' :
                                        order.status === 'completed' ? 'bg-green-100 text-green-600' :
                                        'bg-blue-100 text-blue-600'
                                    }`}>
                                        {order.status}
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p className="text-center py-8 text-gray-400">Aucune commande récente.</p>
                        )}
                    </div>
                </div>

                <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-8">
                    <h3 className="text-lg font-bold mb-6">Activités Systèmes</h3>
                    <div className="space-y-8 relative before:absolute before:left-4 before:top-2 before:bottom-2 before:w-[1px] before:bg-gray-100">
                        {[
                            { t: 'Synchronisation Mobile', d: 'Lien WhatsApp actif', time: 'En direct' },
                            { t: 'Paiements Mobiles', d: 'Wave & Orange Money activés', time: 'Ok' },
                            { t: 'Base de données', d: 'Sauvegarde automatique', time: 'Ok' },
                        ].map((activity, i) => (
                            <div key={i} className="pl-10 relative">
                                <div className="absolute left-2 top-1 w-4 h-4 rounded-full bg-primary-600 border-4 border-white shadow-sm z-10"></div>
                                <div className="text-sm font-bold text-gray-900">{activity.t}</div>
                                <div className="text-xs text-gray-500 mb-1">{activity.d}</div>
                                <div className="text-[10px] text-primary-400 font-bold uppercase tracking-widest">{activity.time}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Dashboard
