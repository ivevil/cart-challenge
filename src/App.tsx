import Product from './components/Product';
import Amount from './components/Amount';
import { useEffect, useState, useReducer } from 'react';
import { ctx } from './context';
import { reducerFn, initialState } from './reducer';


const App: React.FC = () => {

  const [state, dispatch] = useReducer(reducerFn, initialState);
  const [amount, setAmount] = useState<string>('1')
  const updateAmount = (selectedAmount: string): void => {
    setAmount(selectedAmount)
  }

  useEffect(() => {
    fetch('products.json')
      .then(response => response.json())
      .then(data => dispatch({ type: "LIST_PRODUCTS", payload: data }));
  }, [])


  return (
    <ctx.Provider value={state}>
        {
          state.products.length ? (
            <select>
              {
                state.products.map(product => (
                  <Product
                    key={product.id}
                    price={product.price}
                    productName={product.productName}
                    id={product.id}
                    maxAmount={product.maxAmount}
                  />
                ))}
            </select>
          ) : (
            <h2>Loading...</h2>
          )
        }
        <Amount amount={amount} updateAmount={updateAmount} />
    </ctx.Provider>
  )
}

export default App;
