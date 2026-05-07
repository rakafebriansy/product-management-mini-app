import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getProducts, type Product } from '../services/productService';

const ProductList = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            setLoading(true);
            const response = await getProducts();
            setProducts(response.data);
        } catch (e) {
            setError("Failed to fetch product data. Please check your connection.");
        } finally {
            setLoading(false);
        }
    }

    if (loading) return (
        <div className="flex flex-col items-center justify-center min-h-[400px] gap-4">
            <div className="w-12 h-12 border-4 border-purple-500/20 border-t-purple-500 rounded-full animate-spin"></div>
            <p className="text-gray-500 animate-pulse">Loading your products...</p>
        </div>
    )

    if (error) return (
        <div className="max-w-md mx-auto mt-12 p-6 bg-red-50 dark:bg-red-900/10 border border-red-100 dark:border-red-900/20 rounded-2xl text-center">
            <div className="w-12 h-12 bg-red-100 dark:bg-red-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
            </div>
            <h3 className="text-lg font-semibold text-red-900 dark:text-red-400 mb-2">Error</h3>
            <p className="text-red-700 dark:text-red-500 text-sm">{error}</p>
            <button onClick={fetchData} className="mt-4 text-sm font-medium text-red-600 hover:underline">Try again</button>
        </div>
    )

    return (
        <div className='space-y-12 animate-in'>
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b pb-8">
                <div>
                    <div className="flex items-center gap-2 mb-2">
                        <div className="w-2 h-2 rounded-full bg-primary animate-pulse"></div>
                        <span className="text-[10px] uppercase tracking-widest font-black text-primary">Stok Terkini</span>
                    </div>
                    <h1 className='text-4xl md:text-5xl font-black tracking-tighter text-foreground'>Daftar Produk</h1>
                    <p className="text-muted-foreground mt-2 max-w-md text-sm md:text-base font-medium">Pantau dan atur semua inventaris toko Anda di sini.</p>
                </div>
            </div>

            {products.length === 0 ? (
                <div className="text-center py-24 bg-card border border-dashed rounded-[2rem] flex flex-col items-center">
                    <div className="w-24 h-24 bg-muted/50 rounded-full flex items-center justify-center mb-6">
                        <svg className="w-10 h-10 text-muted-foreground/40" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                        </svg>
                    </div>
                    <h3 className="text-xl font-bold">Belum ada produk</h3>
                    <p className="text-muted-foreground mt-2 mb-8 max-w-xs mx-auto">Daftar produk Anda masih kosong. Silakan tambah produk baru.</p>
                    <Link to="/add" className="btn-primary">Tambah Produk Baru</Link>
                </div>
            ) : (
                <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8'>
                    {products.map((p) => (
                        <div key={p.id} className='premium-card p-6 flex flex-col h-full group'>
                            <div className="flex justify-between items-start mb-6">
                                <span className={`text-[10px] uppercase tracking-widest font-black px-3 py-1.5 rounded-full ${p.isActive ? 'bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400' : 'bg-muted text-muted-foreground'}`}>
                                    {p.isActive ? '• Aktif' : '• Draf'}
                                </span>
                                <p className="text-[10px] font-black text-primary/70 uppercase tracking-widest">{p.category}</p>
                            </div>
                            
                            <div className="flex-1">
                                <h3 className='text-xl font-bold group-hover:text-primary transition-colors line-clamp-1'>{p.name}</h3>
                                <p className='text-sm text-muted-foreground mt-3 line-clamp-2 leading-relaxed min-h-[2.5rem]'>
                                    {p.description || "Tidak ada deskripsi produk."}
                                </p>
                            </div>

                            <div className="mt-8 grid grid-cols-2 gap-4 py-6 border-y border-dashed">
                                <div>
                                    <p className="text-[10px] text-muted-foreground uppercase font-black tracking-widest mb-1">Harga</p>
                                    <p className='text-xl font-black text-foreground'>${p.price.toLocaleString()}</p>
                                </div>
                                <div className="text-right">
                                    <p className="text-[10px] text-muted-foreground uppercase font-black tracking-widest mb-1">Stok</p>
                                    <p className={`text-sm font-bold ${p.stock < 5 ? 'text-destructive' : 'text-foreground'}`}>
                                        {p.stock} <span className="text-muted-foreground font-medium uppercase text-[10px] tracking-tight ml-0.5">Unit</span>
                                    </p>
                                </div>
                            </div>

                            <div className="mt-6">
                                <Link to={`/edit/${p.id}`} className="btn-secondary w-full group-hover:bg-primary group-hover:text-white group-hover:border-primary transition-all duration-300">
                                    Edit Produk
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default ProductList;