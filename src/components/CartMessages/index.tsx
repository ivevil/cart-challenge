import './cartmessages.css'

interface CartMessagesProps {
    children: React.ReactNode;
    error: string;
}

const CartMessages: React.FC<CartMessagesProps> = ({ children, error }) => {

    return (
        <>
            <div className={`${error !== '' ? "cart__error-message" : "hidden"}`}>{error}</div>
            <div className="cart__message">
                {children}
            </div>
        </>
    )
}

export default CartMessages;