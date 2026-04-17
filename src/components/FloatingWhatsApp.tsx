import { motion } from 'framer-motion'
import { MessageCircle } from 'lucide-react'

const FloatingWhatsApp = () => {
  const phoneNumber = '+221788260114'
  const message = encodeURIComponent('Bonjour, je souhaite un service de plomberie')
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`

  return (
    <motion.a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      className="fixed bottom-8 right-8 z-[60] bg-accent-500 text-white p-4 rounded-full shadow-2xl flex items-center justify-center group"
    >
      <div className="absolute right-full mr-4 bg-white text-gray-900 px-4 py-2 rounded-lg shadow-xl text-sm font-semibold opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap hidden md:block border border-gray-100">
        Besoin d'aide ? WhatsApp
      </div>
      <MessageCircle size={32} />
      <span className="absolute top-0 right-0 w-3 h-3 bg-red-500 rounded-full border-2 border-white"></span>
    </motion.a>
  )
}

export default FloatingWhatsApp
