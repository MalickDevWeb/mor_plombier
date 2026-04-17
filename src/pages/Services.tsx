import { useEffect } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Wrench, CheckCircle2, Loader2 } from 'lucide-react'
import { useServiceStore } from '../store/serviceStore'

const Services = () => {
  const { services, isLoading, fetchServices } = useServiceStore()

  useEffect(() => {
    fetchServices()
  }, [fetchServices])

  return (
    <div className="pt-24 pb-20">
      {/* Hero */}
      <section className="relative bg-gray-900 py-28 px-4 overflow-hidden">
        <div className="absolute inset-0">
          <img src="/image/seeder/service_chantier.png" alt="Services" className="w-full h-full object-cover opacity-20" />
          <div className="absolute inset-0 bg-gradient-to-br from-primary-900/70 to-gray-900"></div>
        </div>
        <div className="max-w-7xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-5 py-2 bg-primary-600/20 border border-primary-500/30 rounded-full text-primary-300 text-sm font-bold uppercase tracking-widest mb-8"
          >
            Basés à Mbour • Partout au Sénégal
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-7xl font-black text-white mb-6 leading-[0.95]"
          >
            Nos Services <span className="text-gradient">Experts</span>
          </motion.h1>
          <p className="text-primary-200 text-xl max-w-2xl mx-auto opacity-90 font-outfit">
            Des solutions durables pour tous vos besoins en eau et assainissement — résidentiel, commercial et industriel.
          </p>
        </div>
      </section>

      {/* Service Cards */}
      <section className="section">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {isLoading ? (
            <div className="col-span-full flex justify-center py-20">
              <Loader2 className="animate-spin text-primary-600" size={48} />
            </div>
          ) : services.length > 0 ? (
            services.map((s, idx) => (
              <motion.div
                key={s.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="group relative bg-white rounded-[2.5rem] overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 border border-gray-100"
              >
                <div className="h-64 overflow-hidden relative">
                  {s.image_url ? (
                    <img
                      src={s.image_url}
                      alt={s.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-primary-900 to-gray-900 flex items-center justify-center">
                      <Wrench size={48} className="text-white/20" />
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-gray-900/20 to-transparent"></div>
                  <div className="absolute bottom-6 left-6 right-6">
                    <h3 className="text-2xl font-black text-white font-outfit drop-shadow-md">{s.title}</h3>
                  </div>
                </div>

                <div className="p-8">
                  <p className="text-gray-600 mb-8 leading-relaxed line-clamp-3">
                    {s.description}
                  </p>
                  <div className="pt-6 border-t border-gray-100 flex items-center justify-between">
                    <div>
                      <span className="text-xs text-gray-400 uppercase font-bold tracking-wider mb-1 block">Prix indicatif</span>
                      <div className="text-primary-600 font-bold text-lg">{s.price_indicator || 'Sur devis'}</div>
                    </div>
                    <Link to="/commander" className="w-14 h-14 bg-gray-900 rounded-full flex items-center justify-center text-white hover:bg-primary-600 transition-colors shadow-lg group-hover:-rotate-12">
                      <CheckCircle2 size={24} />
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))
          ) : (
            <div className="col-span-full text-center py-20 text-gray-500">
              Aucun service répertorié pour le moment.
            </div>
          )}
        </div>
      </section>

      {/* Pour les Particuliers */}
      <section className="section">
        <div className="grid md:grid-cols-2 gap-16 items-center mb-32">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="absolute -inset-4 bg-primary-600/20 rounded-[3rem] blur-2xl"></div>
            <img
              src="/image/seeder/plumber_working.png"
              alt="Plomberie Résidentielle"
              className="relative rounded-[2.5rem] shadow-2xl z-10 w-full h-[400px] object-cover"
            />
            <div className="absolute -bottom-6 -right-6 bg-white p-6 rounded-3xl shadow-xl border border-gray-100 z-20 hidden md:block">
              <div className="text-4xl font-black text-primary-600">10+</div>
              <div className="text-sm font-bold text-gray-500 uppercase tracking-wider">ans d'expérience</div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="text-primary-600 font-bold uppercase tracking-[0.2em] mb-3 text-sm">Résidentiel</div>
            <h3 className="heading-2 mb-6">Pour les Particuliers</h3>
            <p className="text-gray-600 text-lg mb-8 leading-relaxed">
              Que vous soyez à <span className="font-bold text-gray-900">Mbour</span>, <span className="font-bold text-gray-900">Dakar</span> ou <span className="font-bold text-gray-900">Thiès</span>, MOR Plomberie s'occupe de tout — de la petite fuite à la rénovation complète, avec la garantie d'un travail propre et durable.
            </p>
            <ul className="space-y-4 mb-10">
              {['Installation Douche & Sanitaire', 'Détection de Fuites Invisible', 'Réparation Chauffe-eau Solaire', 'Débouchage Express 24h/24'].map((item, i) => (
                <li key={i} className="flex items-center gap-4 text-gray-700 font-medium">
                  <div className="w-8 h-8 rounded-2xl bg-primary-600 flex items-center justify-center text-white flex-shrink-0">
                    <CheckCircle2 size={16} />
                  </div>
                  {item}
                </li>
              ))}
            </ul>
            <Link to="/commander" className="btn-primary inline-flex">Intervention Particulier</Link>
          </motion.div>
        </div>

        {/* Pour les Pros */}
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="order-2 md:order-1"
          >
            <div className="text-primary-600 font-bold uppercase tracking-[0.2em] mb-3 text-sm">Industriel & Chantiers</div>
            <h3 className="heading-2 mb-6">Pour les Professionnels & Plombiers</h3>
            <p className="text-gray-600 text-lg mb-8 leading-relaxed">
              MOR Plomberie est le partenaire de confiance des <span className="font-bold text-gray-900">promoteurs immobiliers</span> et entrepreneurs du Sénégal. Fournitures en gros, direction de chantier et expertise technique complète.
            </p>
            <ul className="space-y-4 mb-10">
              {['Réseaux Incendie (RIA)', 'Installation Industrielle', 'Maintenance de Copropriété', 'Fourniture de Matériel Pro'].map((item, i) => (
                <li key={i} className="flex items-center gap-4 text-gray-700 font-medium">
                  <div className="w-8 h-8 rounded-2xl bg-gray-900 flex items-center justify-center text-white flex-shrink-0">
                    <CheckCircle2 size={16} />
                  </div>
                  {item}
                </li>
              ))}
            </ul>
            <Link to="/boutique" className="btn-outline inline-flex">Espace Professionnel</Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative order-1 md:order-2"
          >
            <div className="absolute -inset-4 bg-gray-900/20 rounded-[3rem] blur-2xl"></div>
            <img
              src="/image/seeder/service_chantier.png"
              alt="Équipe Technique MOR"
              className="relative rounded-[2.5rem] shadow-2xl z-10 w-full h-[400px] object-cover"
            />
            <div className="absolute -bottom-6 -left-6 bg-gray-900 p-6 rounded-3xl shadow-xl z-20 hidden md:block text-white">
              <div className="text-4xl font-black text-primary-400">500+</div>
              <div className="text-sm font-bold text-gray-400 uppercase tracking-wider">chantiers réalisés</div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default Services
