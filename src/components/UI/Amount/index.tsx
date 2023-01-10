interface AmountProps {
  product: { maxAmount: number },
  updateAmount: (arg: number) => void,
  selectedAmount: number
}

const Amount: React.FC<AmountProps> = ({ updateAmount, selectedAmount, product }) => {
  let maxAmount = product ? product.maxAmount : '';

  return (
    <input id="amount" value={selectedAmount}
      onChange={(
        ev: React.ChangeEvent<HTMLInputElement>,
      ): void => updateAmount(parseInt(ev.target.value))} type="number" min="1" max={maxAmount} />
  )
}

export default Amount;