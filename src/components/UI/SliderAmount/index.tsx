import './slideramount.css'

interface SliderAmountProps {
    amount: number;
    updateAmount: (arg: number) => void;
}

const SliderAmount: React.FC<SliderAmountProps> = ({ amount, updateAmount }) => {

    return (
        <>
            <div className="slidecontainer">
                <input className="slider" type="range" min="1" max="10" onChange={(
            ev: React.ChangeEvent<HTMLInputElement>,
        ): void => updateAmount(parseInt(ev.target.value))}></input>
            </div>
        </>
    )
}

export default SliderAmount;

