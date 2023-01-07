import { ProductInterface } from "../../globalTypes";
import './product.css'

const Products: React.FC<ProductInterface> = ({ productName, price, id }) => {

    return (
        <option value={id}>{productName} - ({price}€)</option>
    )
}

export default Products;