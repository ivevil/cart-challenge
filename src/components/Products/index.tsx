import { Product } from '../../model/Product';

const Products = ({ products }: { products: Product[] }): JSX.Element => {
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