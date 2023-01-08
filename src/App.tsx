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
  const [error, updateMessageError] = useState<string>('')

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
    if(!isNaN(amount) && product !== undefined && amount <= maxAmount) {
      product.amount = amount;
      dispatch({ type: "ADD_TO_CART", payload: product })
      updateMessageError("");
    } else {
      updateMessageError("Please pick the correct number for amount and select the product!")
    }
  }
  let maxAmount = product ? product.maxAmount : 0;

  useEffect(() => {
    fetch('products.json')
      .then(response => response.json())
      .then(data => dispatch({ type: "LIST_PRODUCTS", payload: data }));

      if(maxAmount === 0 || amount <= maxAmount) {
        updateMessageError("");
      } else {
        updateMessageError("Sorry, you reached the limit of products. They are only " + maxAmount + " available!");
      }
  }, [])


  return (
    <ctx.Provider value={state}>
      <Layout>
        <div className='cart__selection'>
          {
            state.products.length ? (
              <select onChange={updateProductId}>
                <option>-Select a product-</option>
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
          <Amount amount={amount} updateAmount={setAmount} product={product} />
          <button onClick={handleClick} className="cart__button-add-product">Add</button>
        </div>
        <div className={`box ${error !== '' ? "cart__error-message" : "hidden"}`}>{error}</div>
        <div className="cart__message">
          <p>Price: {product !== undefined ? product.price : "0"}</p>
          <p>x</p>
          <p className="total">{!isNaN(amount) ? amount : 'invalid number'}</p>
          <p>TOTAL: {product !== undefined && !(isNaN(amount)) ? (Number(product.price) * Number(amount)).toFixed(2) : "0"} €</p>
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
                    <tr key={product.id}>
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
                <tr className="empty"><th>Cart is empty</th></tr>
              )}
          </tbody>
        </table>
      </div>
    </Layout>
    </ctx.Provider >
  )
}

export default App;
