import { ProductInterface } from "../../globalTypes";

const Products: React.FC<ProductInterface> = ({ productName, price, id }) => {

    return (
        <option value={id}>{productName} - ({price}€)</option>
    )
}

export default Products;