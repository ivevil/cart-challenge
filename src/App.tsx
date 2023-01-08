import Product from './components/Product';
import Amount from './components/Amount';
import { Layout } from './layout';
import { useEffect, useState, useReducer } from 'react';
import { ctx } from './context';
import { reducerFn, initialState } from './reducer';
import { ProductInterface } from "./globalTypes";


const App: React.FC = () => {

  const [state, dispatch] = useReducer(reducerFn, initialState);
  const [amount, setAmount] = useState<number>(1)
  const [selProductId, updateProduct] = useState<string>('')

  const updateAmount = (selectedAmount: number): void => {
    setAmount(selectedAmount)
  }

  const updateProductId = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    updateProduct(value);
    dispatch({
      type: "SELECT_A_PRODUCT", payload: product, select: state?.products.find(
        product => product.id === value
      ) as ProductInterface
    })
  };

  const product: ProductInterface = state?.products.find(
    product => product.id === selProductId
  ) as ProductInterface

  const handleClick = () => {
    product.amount = amount;
    dispatch({ type: "ADD_TO_CART", payload: product })
  }

  useEffect(() => {
    fetch('products.json')
      .then(response => response.json())
      .then(data => dispatch({ type: "LIST_PRODUCTS", payload: data }));
  }, [])

  // console.log("product: ", product);
  console.log("state: ", state);
  let maxAmount = product ? product.maxAmount : 'undefined';

  return (
    <ctx.Provider value={state}>
      <Layout>
        <div className='cart__selection'>
          {
            state.products.length ? (
              <select onChange={updateProductId}>
                {
                  state.products.map(product => (
                    <Product
                      key={product.id}
                      amount={amount}
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
          <Amount amount={amount} updateAmount={updateAmount} product={product} />
          <button onClick={handleClick} className="cart__button-add-product">Add</button>
        </div>
        <div className="cart__message">{(amount <= maxAmount && maxAmount !== 'undefined') ? "" : "Sorry, you reached the limit of products. They are only " + maxAmount + " available"}</div>
        <div className="cart__message">
          <p>Price: {product !== undefined ? product.price : "0"}</p>
          <p>x</p>
          <p className="total">{amount}</p>
          <p>TOTAL: {product !== undefined ? (Number(product.price) * Number(amount)).toFixed(2) : "0"} €</p>
        </div>
        <div className="cart__table">
          <table>
            <tbody>
              <tr>
                <th>Product Name</th>
                <th>Unit Price</th>
                <th>Amount</th>
                <th>Price</th>
              </tr>
              {state.shoppingCart.length ? (
                <>
                  {state.shoppingCart.map(product => (
                    <tr>
                      <th>
                        {product.productName}
                      </th>
                      <th>{product.price}</th>
                      <th>{product.amount}</th>
                      <th>{product !== undefined ? (Number(product.price) * Number(product.amount)).toFixed(2) : "0"} €</th>
                    </tr>
                  ))}
                </>
              ) : (
                <tr className="empty">Cart is empty</tr>
              )}
          </tbody>
        </table>
      </div>
    </Layout>
    </ctx.Provider >
  )
}

export default App;
