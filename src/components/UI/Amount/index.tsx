import { useState, useEffect } from 'react';

interface AmountProps {
    amount: number,
    product: { maxAmount: number },
    updateAmount: (arg: number) => void
  }

const Amount: React.FC<AmountProps> = ({ amount, updateAmount, product }) => {
  let maxAmount = product ? product.maxAmount : '';
    const [selectedAmount, setSelectedAmount] = useState<number>(1)
    useEffect(() => {
        setSelectedAmount(amount)
      },[amount])
    
    return (
        <input id="amount" value={selectedAmount} 
        onChange={(
            ev: React.ChangeEvent<HTMLInputElement>,
        ): void => updateAmount(parseInt(ev.target.value))} type="number" min="1" max={maxAmount} />
    )
}

export default Amount;