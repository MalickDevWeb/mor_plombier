import { motion } from 'framer-motion'
import { Wrench, ShoppingBag, Users, TrendingUp, Clock, CheckCircle2 } from 'lucide-react'

const Dashboard = () => {
  const stats = [
    { name: 'Services Actifs', value: '12', icon: <Wrench />, color: 'bg-blue-500' },
    { name: 'Produits Shop', value: '45', icon: <ShoppingBag />, color: 'bg-purple-500' },
    { name: 'Clients Inscrits', value: '128', icon: <Users />, color: 'bg-emerald-500' },
    { name: 'Chiffre d\'Affaire', value: '1.2M', icon: <TrendingUp />, color: 'bg-orange-500' },
  ]

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Bienvenue sur votre Dashboard</h1>
        <p className="text-gray-500">Voici un aperçu de l'activité de MOR Plomberie aujourd'hui.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
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
            {[1, 2, 3].map((_, i) => (
              <div key={i} className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-primary-100 rounded-xl flex items-center justify-center text-primary-600">
                    <Clock size={20} />
                  </div>
                  <div>
                    <div className="font-bold text-gray-900 text-sm">Réparation Fuite</div>
                    <div className="text-xs text-gray-500">Client: Mamadou Diop • Il y a 2h</div>
                  </div>
                </div>
                <div className="bg-amber-100 text-amber-600 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                  En attente
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-8">
          <h3 className="text-lg font-bold mb-6">Activités Récentes</h3>
          <div className="space-y-8 relative before:absolute before:left-4 before:top-2 before:bottom-2 before:w-[1px] before:bg-gray-100">
            {[
              { t: 'Nouveau produit ajouté', d: 'Tuyau PVC D32 (Stock: 50)', time: '10 min ago' },
              { t: 'Service mis à jour', d: 'Installation Chauffe-eau', time: '1h ago' },
              { t: 'Nouvel avis client', d: '5 étoiles par Awa Ndiaye', time: '3h ago' },
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
