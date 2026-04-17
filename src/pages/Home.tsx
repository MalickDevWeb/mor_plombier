import { useEffect } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { CheckCircle, ArrowRight, Star, Loader2, Wrench, Shield, Phone } from 'lucide-react'
import { useServiceStore } from '../store/serviceStore'

const Home = () => {
  const { services, isLoading, fetchServices } = useServiceStore()

  useEffect(() => {
    fetchServices()
  }, [fetchServices])

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative h-[90vh] flex items-center justify-center overflow-hidden bg-gray-900">
        <div className="absolute inset-0 z-0">
          <img 
            src="/image/hero.png" 
            alt="Hero Background" 
            className="w-full h-full object-cover opacity-60"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-gray-900/60 via-transparent to-transparent z-10"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/40 to-transparent"></div>
        </div>

        <div className="section relative z-10 text-center text-white pt-48 md:pt-40 pb-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="heading-1 mb-8">
              L'EXPERTISE <span className="text-gradient">PRO</span><br />
              <span className="italic font-serif font-light text-primary-200">Di jëfë ak dëgg</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-2xl mx-auto font-medium opacity-90 leading-relaxed font-outfit">
              Basés à <span className="text-white font-bold underline decoration-primary-500 underline-offset-8">Mbour</span>, nous intervenons avec rigueur sur tous les chantiers du <span className="text-white font-bold underline decoration-primary-500 underline-offset-8">Sénégal</span>.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Link to="/commander" className="btn-primary px-10 py-5 text-lg group text-white">
                Intervention Rapide
                <CheckCircle className="group-hover:rotate-12 transition-transform" size={20} />
              </Link>
              <Link to="/boutique" className="btn-outline border-white text-white hover:bg-white hover:text-gray-900 px-10 py-5 text-lg">
                Équipement Pro
              </Link>
            </div>
          </motion.div>
            
          <div className="mt-12 flex items-center justify-center gap-8">
            <div className="flex -space-x-3">
              {[
                '/image/seeder/avatar1.png',
                '/image/seeder/avatar2.png',
                '/image/seeder/avatar3.png',
                '/image/seeder/customer_2.png'
              ].map((src, i) => (
                <div key={i} className="w-14 h-14 rounded-full border-4 border-white/20 bg-gray-200 overflow-hidden shadow-xl transform hover:scale-110 transition-transform">
                  <img src={src} alt="client-senegalais" className="w-full h-full object-cover" />
                </div>
              ))}
            </div>
            <div className="text-left">
              <div className="flex text-yellow-500 mb-1">
                {[1,2,3,4,5].map(i => <Star key={i} size={16} fill="currentColor" />)}
              </div>
              <p className="text-sm font-bold text-white">500+ Niit ñu kontaan ci Dakar</p>
              <p className="text-[10px] text-gray-400 uppercase tracking-tighter">Confiance Totale • Service 24h/7</p>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Badges */}
      <section className="py-12 bg-white border-y border-gray-100">
        <div className="max-w-7xl mx-auto px-4 md:px-8 flex flex-wrap justify-between items-center gap-8 opacity-40 grayscale hover:grayscale-0 transition-all font-outfit uppercase tracking-[0.3em] text-xs font-black">
          <span>SDE / SEN'EAU</span>
          <span>ONAS PRO</span>
          <span>SÉNÉGAL ÉMERGENT</span>
          <span>QUALITÉ DAKAR</span>
        </div>
      </section>

      {/* Founder Section */}
      <section className="section my-12 overflow-hidden">
        <div className="glass-card p-0 overflow-hidden flex flex-col md:flex-row items-stretch border-none shadow-2xl">
          <div className="md:w-2/5 relative min-h-[400px]">
            <img 
              src="/image/mor.png" 
              alt="Mor Sylla - Fondateur" 
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-primary-900/80 to-transparent md:bg-gradient-to-r"></div>
            <div className="absolute bottom-8 left-8 text-white">
              <p className="text-sm font-bold uppercase tracking-widest text-primary-400 mb-1">Fondateur & Expert</p>
              <h3 className="text-3xl font-black">Mor Sylla</h3>
            </div>
          </div>
          <div className="md:w-3/5 p-8 md:p-16 flex flex-col justify-center bg-white/40">
            <h2 className="heading-2 mb-6">L'Expertise MOR au Service du Sénégal</h2>
            <p className="text-lg text-gray-600 mb-8 leading-relaxed font-outfit">
              Fort de <span className="text-gray-900 font-bold">10 ans d'expérience</span> à travers l'Afrique (Kinshasa, Lubumbashi), j'ai fondé MOR Plomberie pour apporter l'excellence technique au Sénégal. Notre exigence : rapidité, fiabilité et rigueur sur chaque chantier.
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mb-10">
              <div className="flex items-start gap-3">
                <div className="p-3 bg-primary-600/10 rounded-xl text-primary-600">
                  <Wrench size={24} />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900">Spécialiste Soudure</h4>
                  <p className="text-sm text-gray-500">Cuivre, PVC, PER & Acier</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="p-3 bg-primary-600/10 rounded-xl text-primary-600">
                  <Shield size={24} />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900">Réseaux Industriels</h4>
                  <p className="text-sm text-gray-500">Lecture de plans hydrauliques</p>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-4">
              <Link to="/commander" className="btn-primary">Demander un Devis Gratuit</Link>
              <a href="tel:+221762903264" className="btn-outline">
                <Phone size={20} />
                +221 76-290-32-64
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="section bg-white" id="services">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="heading-2 mb-4">Nos Services de Plomberie</h2>
          <p className="text-gray-600 text-lg">
            Une gamme complète de solutions pour votre maison, bureau ou immeuble.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {isLoading ? (
            <div className="col-span-full flex justify-center py-20">
              <Loader2 className="animate-spin text-primary-600" size={48} />
            </div>
          ) : (services?.length > 0) ? (
            services.slice(0, 3).map((service) => (
              <motion.div 
                key={service.id}
                whileHover={{ y: -10 }}
                className="group bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-xl hover:shadow-2xl transition-all"
              >
                <div className="h-48 overflow-hidden">
                  <img 
                    src={service.image_url || 'https://images.unsplash.com/photo-1581244277943-fe4a9c777189?auto=format&fit=crop&w=800&q=80'} 
                    alt={service.title} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
                  />
                </div>
                <div className="p-8">
                  <div className="mb-4 text-primary-600"><CheckCircle size={32} /></div>
                  <h3 className="text-xl font-bold mb-3">{service.title}</h3>
                  <p className="text-gray-600 mb-6 line-clamp-2">{service.description}</p>
                  <Link to="/services" className="text-primary-600 font-bold flex items-center gap-2 hover:gap-3 transition-all">
                    Détails <ArrowRight size={18} />
                  </Link>
                </div>
              </motion.div>
            ))
          ) : (
            <div className="col-span-full text-center py-20 text-gray-500">
              Aucun service disponible pour le moment.
            </div>
          )}
        </div>
        
        <div className="text-center mt-12">
            <Link to="/services" className="btn-outline">Voir tous les services</Link>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section">
        <div className="bg-primary-600 rounded-[3rem] p-8 md:p-16 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32 blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-primary-900/40 rounded-full -ml-32 -mb-32 blur-3xl"></div>
            
            <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                <div className="text-white">
                    <h2 className="text-3xl md:text-5xl font-bold mb-6">Prêt à régler vos soucis de plomberie ?</h2>
                    <p className="text-primary-100 text-lg mb-8 opacity-90">
                        Cliquez sur le bouton ci-dessous pour parler directement à un expert ou commander une intervention en 2 minutes.
                    </p>
                    <div className="flex flex-wrap gap-4">
                        <Link to="/commander" className="px-8 py-4 bg-white text-primary-600 font-bold rounded-2xl hover:bg-primary-50 transition-all shadow-xl">
                            Commander Service
                        </Link>
                        <a href="https://wa.me/221788260114" className="px-8 py-4 bg-accent-500 text-white font-bold rounded-2xl hover:bg-emerald-600 transition-all shadow-xl flex items-center gap-2">
                            WhatsApp Direct
                        </a>
                    </div>
                </div>
                <div className="hidden md:flex justify-end">
                    <div className="bg-white/20 backdrop-blur-md p-2 rounded-3xl border border-white/30 rotate-3">
                        <img 
                            src="https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=400&q=80" 
                            alt="cta-img" 
                            className="rounded-2xl w-64 shadow-2xl"
                        />
                    </div>
                </div>
            </div>
        </div>
      </section>
    </div>
  )
}

export default Home
