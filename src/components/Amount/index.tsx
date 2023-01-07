import { useState, useEffect, useContext } from 'react';
import { ctx } from "../../context"
import { StateInterface } from "../../globalTypes"

interface AmountProps {
    amount: string,
    product: { maxAmount: number },
    updateAmount: (arg: string) => void
  }

const Amount: React.FC<AmountProps> = ({ amount, updateAmount, product }) => {
  let maxAmount = product ? product.maxAmount : '';
    const [selectedAmount, setSelectedAmount] = useState<string>('')
    useEffect(() => {
        setSelectedAmount(amount)
      },[amount])
    
    return (
        <input id="amount" value={selectedAmount} 
        onChange={(
            ev: React.ChangeEvent<HTMLInputElement>,
        ): void => updateAmount(ev.target.value)} type="number" min="1" max={maxAmount} />
    )
}

export default Amount;