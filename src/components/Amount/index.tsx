import { useState, useEffect } from 'react';

interface AmountProps {
    amount: string,
    updateAmount: (arg: string) => void
  }

const Amount: React.FC<AmountProps> = ({ amount, updateAmount }) => {
    const [selectedAmount, setSelectedAmount] = useState<string>('')
    useEffect(() => {
        setSelectedAmount(amount)
      },[amount])
    
    return (
        <input id="amount" value={selectedAmount}
        onChange={(
            ev: React.ChangeEvent<HTMLInputElement>,
        ): void => updateAmount(ev.target.value)} type="number" min="1" max="10" />
    )
}

export default Amount;