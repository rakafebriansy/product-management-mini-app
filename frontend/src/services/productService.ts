import api from "../api/axios";

export interface Product {
    id?: string | number;
    name: string;
    description: string;
    price: number;
    stock: number;
    category: string;
    isActive: boolean;
    createdAt?: Date;
    updatedAt?: Date;
}

export const getProducts = () => api.get<Product[]>('/products');
export const getProductById = (id: string | number) => api.get<Product>(`/products/${id}`);
export const createProduct = (data: Product) => api.post('/products', data);
export const updateProduct = (id: string | number, data: Product) => api.put(`/products/${id}`, data);
export const deleteProduct = (id: string | number) => api.delete(`/products/${id}`);