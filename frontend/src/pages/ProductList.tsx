import { useEffect, useState } from 'react';
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
            setError("Failed to fetch product data.");
        } finally {
            setLoading(false);
        }
    }

    if (loading) return <p>Loading data...</p>
    if (error) return <p className='text-red-500'>{error}</p>

    return (
        <div className='p-4'>
            <h1 className='text-2xl font-bold mb-4'>Product List</h1>
            <table className='min-w-full'>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Price</th>
                        <th>Stock</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map((p) => (
                        <tr key={p.id}>
                            <td>{p.name}</td>
                            <td>{p.price}</td>
                            <td>{p.stock}</td>
                            <td>{p.isActive ? 'Active' : 'Inactive'}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default ProductList;