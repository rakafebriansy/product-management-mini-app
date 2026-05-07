import React, { useEffect, useState } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { getProductById, updateProduct, type Product } from '../services/productService';

const ProductEdit = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState<Product>({
    name: '',
    description: '',
    price: 0,
    stock: 0,
    category: '',
    isActive: true,
  });

  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        if (id) {
          const response = await getProductById(id);
          setFormData(response.data);
        }
      } catch (err: any) {
        setError(err.response?.status === 404 
          ? "Produk tidak ditemukan." 
          : "Gagal memuat data produk.");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' 
        ? (e.target as HTMLInputElement).checked 
        : (type === 'number' ? Number(value) : value)
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!id) return;
    
    setSubmitting(true);
    setError(null);

    try {
      await updateProduct(id, formData);
      navigate('/');
    } catch (err: any) {
      setError(err.response?.data?.detail || "Gagal memperbarui produk."); 
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return (
    <div className="flex flex-col items-center justify-center min-h-[400px] gap-4">
        <div className="w-12 h-12 border-4 border-primary/20 border-t-primary rounded-full animate-spin"></div>
        <p className="text-muted-foreground animate-pulse font-medium">Memuat detail produk...</p>
    </div>
  );

  return (
    <div className="max-w-2xl mx-auto animate-in">
      <div className="mb-12">
        <Link to="/" className="text-xs font-black text-primary uppercase tracking-[0.2em] flex items-center gap-2 mb-4 hover:gap-3 transition-all">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M15 19l-7-7 7-7" />
          </svg>
          Kembali ke Beranda
        </Link>
        <h2 className="text-4xl font-black tracking-tighter">Edit Produk</h2>
        <p className="text-muted-foreground mt-2 font-medium">Ubah informasi produk <span className="text-foreground font-black">"{formData.name}"</span>.</p>
      </div>

      <div className="premium-card p-8 md:p-10">
        {error && (
          <div className="mb-8 p-4 bg-destructive/10 text-destructive rounded-2xl border border-destructive/20 text-xs font-bold uppercase tracking-wider flex items-center gap-3">
            <svg className="w-5 h-5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="space-y-3">
            <label className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em] ml-1">Nama Produk</label>
            <input
              type="text"
              name="name"
              placeholder="Masukkan nama produk..."
              required
              className="input-field h-14 text-base font-medium"
              value={formData.name}
              onChange={handleChange}
            />
          </div>

          <div className="space-y-3">
            <label className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em] ml-1">Deskripsi</label>
            <textarea
              name="description"
              rows={4}
              placeholder="Jelaskan detail singkat tentang produk ini..."
              className="input-field min-h-[120px] py-4 text-base font-medium resize-none"
              value={formData.description}
              onChange={handleChange}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-3">
              <label className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em] ml-1">Harga ($)</label>
              <input
                type="number"
                name="price"
                min="0"
                step="0.01"
                required
                className="input-field h-14 text-base font-medium"
                value={formData.price}
                onChange={handleChange}
              />
            </div>

            <div className="space-y-3">
              <label className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em] ml-1">Jumlah Stok</label>
              <input
                type="number"
                name="stock"
                min="0"
                required
                className="input-field h-14 text-base font-medium"
                value={formData.stock}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="space-y-3">
            <label className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em] ml-1">Kategori</label>
            <div className="relative">
              <select
                name="category"
                required
                className="input-field h-14 text-base font-medium appearance-none pr-10"
                value={formData.category}
                onChange={handleChange}
              >
                <option value="Electronics">Elektronik</option>
                <option value="Clothes">Pakaian</option>
                <option value="Foods">Makanan</option>
                <option value="Others">Lainnya</option>
              </select>
              <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-muted-foreground">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4 p-5 bg-muted/30 rounded-2xl border border-dashed transition-colors hover:bg-muted/50 group">
            <div className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                name="isActive"
                id="isActive"
                className="sr-only peer"
                checked={formData.isActive}
                onChange={(e) => setFormData(prev => ({ ...prev, isActive: e.target.checked }))}
              />
              <div className="w-12 h-6 bg-muted-foreground/20 rounded-full peer peer-checked:bg-primary transition-all after:content-[''] after:absolute after:top-1 after:left-1 after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:after:translate-x-6"></div>
            </div>
            <label htmlFor="isActive" className="text-xs font-black text-muted-foreground uppercase tracking-widest cursor-pointer group-hover:text-foreground transition-colors">
              Produk Aktif (Tampil di Toko)
            </label>
          </div>

          <div className="flex items-center justify-end gap-6 pt-6">
            <button
              type="button"
              onClick={() => navigate('/')}
              className="text-xs font-black text-muted-foreground uppercase tracking-widest hover:text-foreground transition-colors"
            >
              Batal
            </button>
            <button
              type="submit"
              disabled={submitting}
              className="btn-primary min-w-[180px] h-14 text-sm uppercase tracking-widest"
            >
              {submitting && <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin mr-2"></div>}
              {submitting ? 'Menyimpan...' : 'Simpan Perubahan'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProductEdit;