import './slideramount.css'

interface SliderAmountProps {
    updateAmount: (arg: number) => void;
    selectedAmount: number;
}

const SliderAmount: React.FC<SliderAmountProps> = ({ updateAmount, selectedAmount }) => {

    return (
        <>
            <div className="slidecontainer">
                <input className="slider" value={selectedAmount} type="range" min="1" max="10" onChange={(
                    ev: React.ChangeEvent<HTMLInputElement>,
                ): void => updateAmount(parseInt(ev.target.value))}></input>
            </div>
        </>
    )
}

export default SliderAmount;

