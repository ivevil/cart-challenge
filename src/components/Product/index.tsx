import { Product } from '../../model/Product';

const Products: React.FC<Product> = ({ productName, price }) => {

    return (
        <option>{productName} - ({price}€)</option>
    )
}

export default Products;