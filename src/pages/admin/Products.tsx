import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Plus, 
  Search, 
  Edit2, 
  Trash2, 
  Image as ImageIcon, 
  Check, 
  X,
  Loader2
} from 'lucide-react'
import api from '../../services/api'

const AdminProducts = () => {
  const [products, setProducts] = useState<any[]>([])
  const [categories, setCategories] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isDeleting, setIsDeleting] = useState<number | null>(null)
  
  // Form State
  const [editingProduct, setEditingProduct] = useState<any | null>(null)
  const [formData, setFormData] = useState({
    name: '',
    category_id: '',
    description: '',
    price: '',
    stock: '',
    image: null as File | null,
    image_url: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      const [prodRes, catRes] = await Promise.all([
        api.get('/products'),
        api.get('/categories')
      ])
      setProducts(prodRes.data.data)
      setCategories(catRes.data.data.filter((c: any) => c.type === 'shop'))
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const handleOpenModal = (product: any = null) => {
    if (product) {
      setEditingProduct(product)
      setFormData({
        name: product.name,
        category_id: product.category?.id || '',
        description: product.description || '',
        price: product.price.toString(),
        stock: product.stock.toString(),
        image: null,
        image_url: product.image_url
      })
    } else {
      setEditingProduct(null)
      setFormData({
        name: '',
        category_id: '',
        description: '',
        price: '',
        stock: '0',
        image: null,
        image_url: ''
      })
    }
    setIsModalOpen(true)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const data = new FormData()
      data.append('name', formData.name)
      data.append('category_id', formData.category_id)
      data.append('description', formData.description)
      data.append('price', formData.price)
      data.append('stock', formData.stock)
      if (formData.image) {
        data.append('image', formData.image)
      }

      if (editingProduct) {
        // Laravel PATCH with FormData workaround: append _method
        data.append('_method', 'PATCH')
        await api.post(`/products/${editingProduct.id}`, data, {
          headers: { 'Content-Type': 'multipart/form-data' }
        })
      } else {
        await api.post('/products', data, {
          headers: { 'Content-Type': 'multipart/form-data' }
        })
      }

      setIsModalOpen(false)
      fetchData()
    } catch (err) {
      console.error(err)
      alert("Erreur lors de l'enregistrement.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleDelete = async (id: number) => {
    if (!window.confirm("Supprimer ce produit ?")) return
    setIsDeleting(id)
    try {
      await api.delete(`/products/${id}`)
      fetchData()
    } catch (err) {
      console.error(err)
    } finally {
      setIsDeleting(null)
    }
  }

  const filteredProducts = products.filter(p => 
    p.name.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Gestion Boutique</h1>
          <p className="text-gray-500">Ajoutez, modifiez ou supprimez vos articles de plomberie.</p>
        </div>
        <button 
          onClick={() => handleOpenModal()}
          className="btn-primary inline-flex items-center gap-2 px-6 py-3"
        >
          <Plus size={20} /> Nouveau Produit
        </button>
      </div>

      <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-gray-100 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="relative w-full md:w-96">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input 
              type="text"
              placeholder="Rechercher un produit..."
              className="w-full pl-12 pr-4 py-2 bg-gray-50 border-none rounded-xl focus:ring-2 focus:ring-primary-500 text-sm"
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-gray-50/50 text-xs font-bold text-gray-400 uppercase tracking-widest">
              <tr>
                <th className="px-6 py-4">Produit</th>
                <th className="px-6 py-4">Catégorie</th>
                <th className="px-6 py-4">Prix</th>
                <th className="px-6 py-4">Stock</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {loading ? (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center">
                    <Loader2 className="animate-spin text-primary-500 mx-auto" size={32} />
                  </td>
                </tr>
              ) : filteredProducts.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-gray-400">
                    Aucun produit trouvé.
                  </td>
                </tr>
              ) : filteredProducts.map((product) => (
                <tr key={product.id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-xl bg-gray-100 overflow-hidden flex-shrink-0 border border-gray-100">
                        <img 
                          src={product.image_url} 
                          alt={product.name}
                          className="w-full h-full object-cover"
                          onError={(e: any) => e.target.src = '/image/seeder/default.png'}
                        />
                      </div>
                      <div>
                        <div className="font-bold text-gray-900">{product.name}</div>
                        <div className="text-xs text-gray-500 truncate max-w-[200px]">{product.description}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="px-3 py-1 bg-gray-100 text-gray-600 rounded-lg text-xs font-bold">
                      {product.category?.name || 'Inconnue'}
                    </span>
                  </td>
                  <td className="px-6 py-4 font-bold text-gray-900">
                    {Number(product.price).toLocaleString()} F
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                       <div className={`w-2 h-2 rounded-full ${product.stock > 10 ? 'bg-green-500' : 'bg-amber-500'}`}></div>
                       <span className="font-medium text-gray-700">{product.stock}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end gap-2">
                      <button 
                        onClick={() => handleOpenModal(product)}
                        className="p-2 text-gray-400 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-all"
                        title="Modifier"
                      >
                        <Edit2 size={18} />
                      </button>
                      <button 
                        onClick={() => handleDelete(product.id)}
                        disabled={isDeleting === product.id}
                        className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 addr-50 rounded-lg transition-all"
                        title="Supprimer"
                      >
                        {isDeleting === product.id ? <Loader2 className="animate-spin" size={18} /> : <Trash2 size={18} />}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="absolute inset-0 bg-gray-950/50 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-2xl bg-white rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
            >
              <div className="p-8 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
                <h3 className="text-xl font-black text-gray-900">
                  {editingProduct ? 'Modifier le Produit' : 'Nouveau Produit'}
                </h3>
                <button 
                  onClick={() => setIsModalOpen(false)}
                  className="p-2 text-gray-400 hover:text-gray-900 rounded-full hover:bg-white transition-all"
                  title="Fermer"
                >
                  <X size={24} />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-8 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Image Upload Preview */}
                  <div className="md:col-span-2">
                    <label className="text-sm font-bold text-gray-700 block mb-2">Image du produit</label>
                    <div className="relative group">
                      <div className="w-full h-48 bg-gray-50 rounded-3xl border-2 border-dashed border-gray-200 flex flex-col items-center justify-center overflow-hidden transition-colors hover:border-primary-500">
                        {formData.image || formData.image_url ? (
                          <img 
                            src={formData.image ? URL.createObjectURL(formData.image) : formData.image_url} 
                            className="w-full h-full object-cover"
                            alt="Preview"
                          />
                        ) : (
                          <>
                            <ImageIcon className="text-gray-300 mb-2" size={40} />
                            <p className="text-xs text-gray-400">Cliquez pour ajouter une image (PNG, JPG)</p>
                          </>
                        )}
                        <input 
                          type="file"
                          accept="image/*"
                          className="absolute inset-0 opacity-0 cursor-pointer"
                          onChange={e => {
                            const file = e.target.files?.[0]
                            if (file) setFormData({...formData, image: file})
                          }}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-700">Nom du produit</label>
                    <input 
                      required
                      type="text"
                      className="w-full px-4 py-3 bg-gray-50 border-none rounded-xl focus:ring-2 focus:ring-primary-500"
                      value={formData.name}
                      onChange={e => setFormData({...formData, name: e.target.value})}
                      title="Nom du produit"
                      aria-label="Nom du produit"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-700">Catégorie</label>
                    <select 
                      required
                      className="w-full px-4 py-3 bg-gray-50 border-none rounded-xl focus:ring-2 focus:ring-primary-500"
                      value={formData.category_id}
                      onChange={e => setFormData({...formData, category_id: e.target.value})}
                      title="Catégorie"
                      aria-label="Catégorie"
                    >
                      <option value="">Sélectionner...</option>
                      {categories.map(c => (
                        <option key={c.id} value={c.id}>{c.name}</option>
                      ))}
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-700">Prix (FCFA)</label>
                    <input 
                      required
                      type="number"
                      className="w-full px-4 py-3 bg-gray-50 border-none rounded-xl focus:ring-2 focus:ring-primary-500"
                      value={formData.price}
                      onChange={e => setFormData({...formData, price: e.target.value})}
                      title="Prix"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-700">Stock initial</label>
                    <input 
                      required
                      type="number"
                      className="w-full px-4 py-3 bg-gray-50 border-none rounded-xl focus:ring-2 focus:ring-primary-500"
                      value={formData.stock}
                      onChange={e => setFormData({...formData, stock: e.target.value})}
                      title="Stock"
                    />
                  </div>

                  <div className="md:col-span-2 space-y-2">
                    <label className="text-sm font-bold text-gray-700">Description</label>
                    <textarea 
                      rows={3}
                      className="w-full px-4 py-3 bg-gray-50 border-none rounded-xl focus:ring-2 focus:ring-primary-500"
                      value={formData.description}
                      onChange={e => setFormData({...formData, description: e.target.value})}
                      title="Description"
                    />
                  </div>
                </div>

                <div className="flex gap-4 pt-4">
                  <button 
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="flex-1 px-6 py-4 bg-gray-100 text-gray-700 font-bold rounded-2xl hover:bg-gray-200 transition-all"
                  >
                    Annuler
                  </button>
                  <button 
                    type="submit"
                    disabled={isSubmitting}
                    className="flex-3 btn-primary px-10 py-4 flex justify-center items-center gap-2"
                  >
                    {isSubmitting ? (
                      <Loader2 className="animate-spin" size={24} />
                    ) : (
                      <>
                        <Check size={24} /> 
                        {editingProduct ? 'Enregistrer les modifications' : 'Créer le produit'}
                      </>
                    )}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default AdminProducts
