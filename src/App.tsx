import Product from './components/Product';
// import Amount from './components/Amount';
import { useEffect, useReducer } from 'react';
import { ctx } from './context';
import { reducerFn, initialState } from './reducer';
// import { Product } from './model/Product';


function App(): JSX.Element {

  const [state, dispatch] = useReducer(reducerFn, initialState);

  useEffect(() => {
    fetch('products.json')
      .then(response => response.json())
      .then(data => dispatch({ type: "ADD_PRODUCTS", payload: data }));
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
    </ctx.Provider>
  )
}

export default App;
