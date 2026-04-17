import { motion } from 'framer-motion'
import { Phone, Mail, MapPin, MessageCircle, Send, Clock, Wrench } from 'lucide-react'

const Contact = () => {
    const info = [
        {
            icon: <Phone size={26} />,
            label: 'Appelez-nous',
            value: '+221 76-290-32-64',
            sub: 'Disponible 24h/7 — Urgences plomberie',
            href: 'tel:+221762903264',
            color: 'from-primary-500 to-primary-700'
        },
        {
            icon: <MessageCircle size={26} />,
            label: 'WhatsApp Direct',
            value: 'Envoyer un message',
            sub: 'Réponse en moins de 5 minutes',
            href: 'https://wa.me/221762903264?text=Bonjour%20Mor%20Plomberie%2C%20j%27ai%20besoin%20d%27une%20intervention.',
            color: 'from-green-500 to-green-700'
        },
        {
            icon: <Mail size={26} />,
            label: 'Email',
            value: 'morsyllaplomberie64@gmail.com',
            sub: 'Réponse sous 24h',
            href: 'mailto:morsyllaplomberie64@gmail.com',
            color: 'from-orange-500 to-orange-700'
        },
        {
            icon: <MapPin size={26} />,
            label: 'Zone d\'Intervention',
            value: 'Mbour — Tout le Sénégal',
            sub: 'Déplacements sur devis',
            href: '#',
            color: 'from-purple-500 to-purple-700'
        },
    ]

    return (
        <div className="pt-24 pb-0 min-h-screen bg-[#FAFBFF]">
            {/* Header Hero */}
            <section className="relative py-24 overflow-hidden bg-gray-900">
                <div className="absolute inset-0">
                    <img src="/image/seeder/service_chantier.png" alt="Contact" className="w-full h-full object-cover opacity-20" />
                    <div className="absolute inset-0 bg-gradient-to-br from-primary-900/80 to-gray-900/90"></div>
                </div>
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="relative z-10 text-center max-w-3xl mx-auto px-4"
                >
                    <div className="inline-flex items-center gap-2 px-5 py-2 bg-primary-600/20 border border-primary-500/30 rounded-full text-primary-300 text-sm font-bold uppercase tracking-widest mb-6">
                        <Clock size={14} /> Disponible 24h/7
                    </div>
                    <h1 className="text-5xl md:text-7xl font-black text-white mb-6 leading-[0.95]">
                        On discute de <span className="text-gradient">votre projet</span> ?
                    </h1>
                    <p className="text-xl text-gray-300 font-outfit">
                        Une fuite d'urgence, une installation ou un grand chantier — Mor et son équipe répondent toujours présents.
                    </p>
                </motion.div>
            </section>

            {/* Contact Cards */}
            <section className="section -mt-12 relative z-10">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
                    {info.map((item, i) => (
                        <motion.a
                            key={i}
                            href={item.href}
                            target={item.href.startsWith('http') ? '_blank' : undefined}
                            rel="noreferrer"
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1 }}
                            whileHover={{ y: -8, scale: 1.02 }}
                            className="group bg-white rounded-[2rem] p-8 shadow-xl border border-gray-100 flex flex-col gap-5 hover:shadow-2xl transition-all duration-400"
                        >
                            <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${item.color} flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform`}>
                                {item.icon}
                            </div>
                            <div>
                                <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-1">{item.label}</p>
                                <p className="font-bold text-gray-900 text-lg leading-tight">{item.value}</p>
                                <p className="text-sm text-gray-500 mt-1">{item.sub}</p>
                            </div>
                        </motion.a>
                    ))}
                </div>

                {/* Main Form + Info */}
                <div className="grid grid-cols-1 lg:grid-cols-5 gap-16 items-start">
                    {/* Left - Bio */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="lg:col-span-2 space-y-10"
                    >
                        <div>
                            <div className="text-primary-600 font-bold uppercase tracking-[0.2em] mb-3 text-sm">Votre Expert</div>
                            <h2 className="heading-2 mb-4">Mor Sylla, à votre service</h2>
                            <p className="text-gray-600 leading-relaxed text-lg">
                                Fort d'une décennie d'expérience des chantiers africains, Mor et son équipe se déplacent dans tout le <strong>Sénégal</strong> pour garantir des installations parfaites.
                            </p>
                        </div>

                        <div className="flex items-center gap-5 p-6 bg-white rounded-[2rem] border border-gray-100 shadow-lg">
                            <div className="w-20 h-20 rounded-2xl overflow-hidden shadow-md flex-shrink-0">
                                <img src="/image/seeder/plumber_working.png" alt="Mor Sylla" className="w-full h-full object-cover object-center" />
                            </div>
                            <div>
                                <p className="font-black text-gray-900 text-xl">Mor Sylla</p>
                                <p className="text-primary-600 font-medium text-sm">Fondateur & Expert • 10+ ans</p>
                                <a href="tel:+221762903264" className="inline-flex items-center gap-1 mt-2 text-sm font-bold text-gray-700 hover:text-primary-600 transition-colors">
                                    <Phone size={14} /> +221 76-290-32-64
                                </a>
                            </div>
                        </div>

                        <div className="space-y-4">
                            {['Devis gratuit et sans engagement', 'Intervention rapide 24h/7', 'Garantie sur tous nos travaux', 'Déplacements partout au Sénégal'].map((item, i) => (
                                <div key={i} className="flex items-center gap-3">
                                    <div className="w-6 h-6 rounded-full bg-primary-600/10 flex items-center justify-center text-primary-600">
                                        <Wrench size={12} />
                                    </div>
                                    <span className="text-gray-700 font-medium">{item}</span>
                                </div>
                            ))}
                        </div>
                    </motion.div>

                    {/* Right - Form */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="lg:col-span-3 bg-white rounded-[3rem] border border-gray-100 shadow-2xl p-10 md:p-14"
                    >
                        <h3 className="text-3xl font-black mb-2">Envoyez votre demande</h3>
                        <p className="text-gray-500 mb-10">Décrivez votre besoin, nous revenons vers vous rapidement.</p>
                        <form className="space-y-6" onSubmit={e => e.preventDefault()}>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-gray-700 ml-1">Prénom & Nom</label>
                                    <input
                                        type="text"
                                        className="w-full px-6 py-4 rounded-2xl bg-gray-50 border border-gray-100 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:bg-white transition-all font-outfit"
                                        placeholder="Votre nom complet"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-gray-700 ml-1">Téléphone</label>
                                    <input
                                        type="tel"
                                        className="w-full px-6 py-4 rounded-2xl bg-gray-50 border border-gray-100 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:bg-white transition-all font-outfit"
                                        placeholder="+221 7X XXX XX XX"
                                    />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-gray-700 ml-1">Type d'intervention</label>
                                <select aria-label="Type d'intervention" className="w-full px-6 py-4 rounded-2xl bg-gray-50 border border-gray-100 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:bg-white transition-all font-outfit text-gray-700">
                                    <option value="">Sélectionnez une catégorie...</option>
                                    <option>Réparation fuite urgente</option>
                                    <option>Installation chauffe-eau</option>
                                    <option>Rénovation salle de bain</option>
                                    <option>Grand chantier / Immeuble</option>
                                    <option>Maintenance & Entretien</option>
                                    <option>Autre demande</option>
                                </select>
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-gray-700 ml-1">Ville / Quartier</label>
                                <input
                                    type="text"
                                    className="w-full px-6 py-4 rounded-2xl bg-gray-50 border border-gray-100 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:bg-white transition-all font-outfit"
                                    placeholder="Ex: Mbour, Dakar, Thiès..."
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-gray-700 ml-1">Description du problème</label>
                                <textarea
                                    rows={5}
                                    className="w-full px-6 py-4 rounded-2xl bg-gray-50 border border-gray-100 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:bg-white transition-all font-outfit resize-none"
                                    placeholder="Décrivez votre problème de plomberie en détail..."
                                />
                            </div>
                            <div className="flex gap-4 flex-col sm:flex-row">
                                <button type="submit" className="btn-primary flex-1 py-5 text-lg">
                                    Envoyer la demande
                                    <Send size={20} />
                                </button>
                                <a
                                    href="https://wa.me/221762903264?text=Bonjour%20Mor%20Plomberie%2C%20j%27ai%20besoin%20d%27une%20intervention."
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex-1 py-5 bg-green-500 hover:bg-green-600 text-white font-bold rounded-2xl flex items-center justify-center gap-3 shadow-xl shadow-green-500/30 transition-all hover:-translate-y-0.5"
                                >
                                    <MessageCircle size={22} /> WhatsApp
                                </a>
                            </div>
                        </form>
                    </motion.div>
                </div>
            </section>

            {/* Map Banner */}
            <section className="h-[400px] w-full mt-24 relative bg-gray-900 overflow-hidden">
                <img
                    src="/image/seeder/service_chantier.png"
                    className="w-full h-full object-cover opacity-30"
                    alt="Mbour Sénégal - Zone d'intervention"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 to-transparent flex flex-col items-center justify-center gap-4">
                    <div className="animate-pulse-ring w-16 h-16 bg-primary-600 rounded-full flex items-center justify-center">
                        <MapPin className="text-white" size={28} />
                    </div>
                    <div className="text-center">
                        <h3 className="text-3xl font-black text-white">Basés à Mbour</h3>
                        <p className="text-primary-300 font-medium mt-1">Interventions dans tout le Sénégal</p>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Contact
