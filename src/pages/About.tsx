import { motion } from 'framer-motion'
import { Award, Wrench, Users, Shield } from 'lucide-react'

const About = () => {
    const values = [
        {
            t: 'Engagement Local',
            d: 'Nous formons et employons les meilleurs talents de Dakar et Mbour. Chaque technicien MOR est rigoureusement sélectionné et formé aux standards internationaux.',
            src: '/image/seeder/technician_group.png',
            color: 'from-primary-600 to-primary-800',
            badge: '🤝'
        },
        {
            t: 'Qualité Certifiée',
            d: 'Nous respectons strictement les normes internationales adaptées au climat tropical du Sénégal. Chaque installation est garantie et inspectée avant livraison.',
            src: '/image/seeder/plumber_working.png',
            color: 'from-gray-800 to-gray-950',
            badge: '✅'
        },
        {
            t: 'Service Teranga',
            d: 'Un accompagnement chaleureux, transparent et humain pour chaque client. De l\'urgence au grand chantier, nous sommes toujours présents.',
            src: '/image/seeder/avatar1.png',
            color: 'from-primary-700 to-primary-900',
            badge: '⭐'
        },
    ]

    return (
        <div className="pt-24 pb-20">
            <section className="section grid grid-cols-1 md:grid-cols-2 gap-16 items-start">
                <motion.div
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                >
                    <h1 className="heading-1 mb-6">L'Histoire de MOR Plomberie</h1>
                    <p className="text-xl text-primary-600 font-bold mb-8 font-outfit">
                        Une expertise forgée sur les plus grands chantiers d'Afrique, maintenant au service du Sénégal.
                    </p>
                    <p className="text-gray-600 text-lg mb-6 leading-relaxed">
                        Fondée par <span className="font-bold text-gray-900">Mor Sylla</span>, un expert passionné avec plus de 10 ans d'expérience, MOR Plomberie est née de la volonté d'apporter un standard de qualité internationale au marché sénégalais.
                    </p>
                    <p className="text-gray-600 text-lg mb-10 leading-relaxed">
                        Aujourd'hui basé à <span className="font-bold text-gray-900 border-b-2 border-primary-500">Mbour</span>, il intervient avec son équipe sur tous les chantiers du <span className="font-bold text-gray-900">Sénégal</span>, apportant son savoir-faire aux particuliers et promoteurs exigeants.
                    </p>

                    {/* Full-width horizontal cards */}
                    <div className="flex flex-col gap-5 w-full">
                        {values.map((val, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                whileHover={{ scale: 1.02, x: 4 }}
                                className="group relative w-full flex rounded-[1.75rem] overflow-hidden shadow-lg border border-gray-100 bg-white min-h-[140px]"
                            >
                                {/* Image side */}
                                <div className="w-40 md:w-52 flex-shrink-0 relative overflow-hidden">
                                    <img
                                        src={val.src}
                                        alt={val.t}
                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                    />
                                    <div className={`absolute inset-0 bg-gradient-to-r ${val.color} opacity-60`}></div>
                                    <div className="absolute inset-0 flex items-center justify-center text-5xl drop-shadow-lg">
                                        {val.badge}
                                    </div>
                                </div>
                                {/* Text side */}
                                <div className="flex-1 px-7 py-6 flex flex-col justify-center">
                                    <h3 className="text-lg md:text-xl font-black mb-2 font-outfit text-gray-900">{val.t}</h3>
                                    <p className="text-gray-500 leading-relaxed font-outfit text-sm">{val.d}</p>
                                </div>
                                {/* Right accent bar */}
                                <div className={`w-1.5 bg-gradient-to-b ${val.color} flex-shrink-0`}></div>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>

                <div className="relative">
                    <img
                        src="/image/seeder/service_chantier.png"
                        alt="Chantier MOR"
                        className="rounded-[3rem] shadow-2xl w-full h-[500px] object-cover"
                    />
                    <div className="absolute -bottom-8 -left-8 bg-white p-6 rounded-2xl shadow-xl border border-gray-100 hidden lg:block">
                        <div className="flex items-center gap-3">
                            <Award className="text-primary-600" size={32} />
                            <div>
                                <div className="font-black text-gray-900">Certifié Qualité Pro</div>
                                <div className="text-sm text-gray-500">Mbour • Sénégal</div>
                            </div>
                        </div>
                    </div>
                    <div className="absolute -top-6 -right-6 bg-primary-600 text-white p-6 rounded-2xl shadow-xl hidden lg:block">
                        <div className="text-3xl font-black">10+</div>
                        <div className="text-xs font-bold text-primary-200 uppercase tracking-wider">ans d'expérience</div>
                    </div>
                </div>
            </section>

            <section className="bg-gray-900 py-32 px-4 rounded-[4rem] mx-4 my-20 glass-dark">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-20 text-white">
                        <h2 className="text-4xl md:text-6xl font-black mb-6 font-outfit">Nos Valeurs <span className="text-primary-500">Fondamentales</span></h2>
                        <p className="opacity-70 text-xl font-medium">Le socle de notre engagement quotidien.</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                        {[
                            { title: 'Qualité Sans Compromis', desc: 'Nous ne coupons jamais sur la qualité des matériaux. Chaque joint, chaque vanne est sélectionné pour sa durabilité.', icon: <Shield size={40} /> },
                            { title: 'Innovation Continue', desc: 'Formation constante aux nouvelles normes internationales et aux outils de détection de fuites de pointe.', icon: <Wrench size={40} /> },
                            { title: 'Approche Humaine', desc: 'Un plombier n\'est pas qu\'un technicien, c\'est un partenaire. Nous écoutons et conseillons.', icon: <Users size={40} /> },
                        ].map((v, i) => (
                            <div key={i} className="text-center group p-8 rounded-[3rem] hover:bg-white/5 transition-all">
                                <div className="w-24 h-24 bg-primary-600/10 rounded-[2.5rem] flex items-center justify-center text-primary-500 mb-8 mx-auto group-hover:bg-primary-600 group-hover:text-white transition-all transform group-hover:scale-110 group-hover:rotate-6">
                                    {v.icon}
                                </div>
                                <h3 className="text-2xl font-bold text-white mb-4 font-outfit">{v.title}</h3>
                                <p className="text-gray-400 leading-relaxed text-lg">{v.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    )
}

export default About
