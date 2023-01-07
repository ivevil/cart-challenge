import { Product } from '../../model/Product';

const Products: React.FC<Product> = ({ productName, price, id }) => {

    return (
        <option>{productName} - ({price}€)</option>
    )
}

export default Products;