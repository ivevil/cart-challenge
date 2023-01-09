import './modal.css'

interface ModalProps {
    open: boolean;
    toggle: () => void;
    children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ open, toggle, children }) => {

    return (
        <>
            {
                open ? (
                    <div className="cart__modal-overlay" onClick={toggle}>
                        <div className="cart__modal">
                            <div className="cart__modal-close" onClick={toggle}>X</div>
                            {children}
                        </div>
                    </div>
                ) : ('')
            }
        </>
    )
}

export default Modal;