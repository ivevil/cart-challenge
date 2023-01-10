import { StateInterface } from "../../../globalTypes";
import Button from "../../UI/Button";
import Icon from "../../UI/Icon";
import Table from "../../UI/Table";
import './carttable.css'

interface CartTableProps {
    state: StateInterface;
    removeTheProduct: (arg: string) => void;
}

const CartTable: React.FC<CartTableProps> = ({ state, removeTheProduct }) => {
    
    const firstRowArray = ["PRODUCT NAME", "UNIT PRICE", "AMOUNT", "PRICE", ""]

    return (
        <>
            <div className="cart__table">
                {state.shoppingCart.length ? (
                    <>
                        <Table firstRowArray={firstRowArray}>
                            {state.shoppingCart.map(product => (
                                <tr key={product.id}>
                                    <th>
                                        {product.productName}
                                    </th>
                                    <th>{product.price}</th>
                                    <th>{product.amount}</th>
                                    <th>{product !== undefined ? (Number(product.price) * Number(product.amount)).toFixed(2) : "0"} €</th>
                                    <th>
                                        <Button buttonClass={"danger"} onClick={() => removeTheProduct(product.id)} disabled={false}>
                                            <Icon color="white" />
                                        </Button>
                                    </th>
                                </tr>
                            ))}
                        </Table>
                    </>
                ) : (
                    <div className="cart__empty">
                        <h2>Cart is empty</h2>
                    </div>
                )}
            </div>
        </>
    )
}

export default CartTable;