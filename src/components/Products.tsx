import React from 'react';
import { Product } from '../model/Product';

const Products = ({ products }: { products: Product[] }) => {
    return (
        <select>
            {products.map((product: any) => {
                return (
                    <option key={product.id}>{product.productName} ({product.price}€)</option>
                )
            })}
        </select>
    )
}

export default Products;