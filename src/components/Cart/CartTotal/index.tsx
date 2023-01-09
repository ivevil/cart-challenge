import { StateInterface } from '../../../globalTypes';
import Button from '../../UI/Button';
import './carttotal.css'

interface CartTotalProps {
    state: StateInterface;
    getTotal: string;
    clearCart: () => void;
    buyItems: () => void;
}

const CartTotal: React.FC<CartTotalProps> = ({ state, getTotal, clearCart, buyItems }) => {

    return (
        <>

            <div className="cart__final">
                <div className="cart__final-total">
                    <h3 className="cart__final-total-message">{state.totalAmount >= 10 ? "You reached the limit of ten items." : ""}</h3>
                </div>
                <div className="cart__final-total">
                    TOTAL TO PAY:
                    <h3>
                        {getTotal} €
                    </h3>
                </div>
                <div className="cart__final-checkout">
                    <Button disabled={state.totalAmount < 1 ? true : false} onClick={clearCart} buttonClass={"danger"}>EMPTY CART</Button>
                    <Button disabled={state.totalAmount < 1 ? true : false} onClick={buyItems} buttonClass={"primary"}>BUY</Button>
                </div>
            </div>
        </>
    )
}

export default CartTotal;