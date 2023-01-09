import { StateInterface, ProductInterface } from "../../../globalTypes";
import Product from '../Product';
import Amount from '../Amount';
import Button from '../../UI/Button';
import './cartselection.css';

interface CartProps {
    state: StateInterface;
    selectProduct: (arg: string) => void;
    handleClick: () => void;
    amount: number;
    setAmount: (arg: number) => void;
    product: ProductInterface;
    checkIfButtonIsDisabled: boolean | undefined;
}

const CartSelection: React.FC<CartProps> = ({ state, selectProduct, amount, handleClick, setAmount, product, checkIfButtonIsDisabled }) => {

    return (
        <>
            <div className="cart__selection">
                {
                    state.products.length ? (
                        <select onChange={(
                            ev: React.ChangeEvent<HTMLSelectElement>,
                        ): void => selectProduct(ev.target.value)}>
                            <option value="0">-Select a product-</option>
                            {
                                state.products.map(product => (
                                    <Product
                                        key={product.id}
                                        amount={amount}
                                        price={product.price}
                                        productName={product.productName}
                                        id={product.id}
                                        maxAmount={product.maxAmount}
                                    />
                                ))}
                        </select>
                    ) : (
                        <h2>Loading...</h2>
                    )
                }
                <Amount amount={amount} updateAmount={setAmount} product={product} />
                <Button onClick={handleClick} disabled={checkIfButtonIsDisabled} buttonClass={"primary"}>
                    ADD
                </Button>
            </div>
        </>
    )
}

export default CartSelection;