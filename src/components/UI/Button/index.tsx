import './button.css'

interface ButtonProps {
    children: React.ReactNode;
    onClick: () => void;
    disabled: boolean | undefined;
    buttonClass: string;
}

const Button: React.FC<ButtonProps> = ({ children, onClick, disabled, buttonClass }) => {

    return (
        <>
            {
                <button className={buttonClass} disabled={disabled} onClick={onClick}>
                    {children}
                </button>
            }
        </>
    )
}

export default Button;