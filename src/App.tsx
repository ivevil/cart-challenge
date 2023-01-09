import Modal from './components/UI/Modal';
import Button from './components/UI/Button';
import CartSelection from './components/CartSelection';
import { Layout } from './components/UI/Layout';
import { useEffect, useState, useReducer } from 'react';
import { reducerFn, initialState } from './reducer';
import { ProductInterface } from "./globalTypes";

const App: React.FC = () => {

  const [state, dispatch] = useReducer(reducerFn, initialState);
  const [amount, setAmount] = useState<number>(1)
  const [selProductId, updateProduct] = useState<string>('')
  const [error, updateMessageError] = useState<string>('')
  const [modal, showModal] = useState(false);

  const selectProduct = (id: string) => {
    const value = id;
    if (value !== undefined || value !== "0") {
      updateProduct(value);
      dispatch({
        type: "SELECT_A_PRODUCT", payload: product, select: state?.products.find(
          product => product.id === value
        ) as ProductInterface
      })
    }
  }

  const product: ProductInterface = state?.products.find(
    product => product.id === selProductId
  ) as ProductInterface

  const handleClick = () => {

    if (isNaN(amount) || amount === 0) {
      updateMessageError("Sorry, you need to select valid number as an amount!");
    } else if (product === undefined) {
      updateMessageError("Sorry, you need to pick a product!");
    } else if (amount > maxAmount) {
      updateMessageError("Sorry, there is no enough items. There is/are only " + maxAmount + " available!");
    } else {
      product.amount = amount;
      dispatch({ type: "ADD_TO_CART", payload: product })
      updateMessageError("");
    }

  }

  let maxAmount = product ? product.maxAmount : 0;

  const removeTheProduct = (id: string) => {
    dispatch({ type: "REMOVE_THE_PRODUCT", payload: id })
  }

  const clearCart = () => {
    dispatch({
      type: "CLEAR_CART", payload: product
    })
  }

  const buyItems = () => {
    toggle();
    dispatch({
      type: "CLEAR_CART", payload: product
    })
  }

  const toggle = () => {
    showModal(!modal);
  }

  const checkIfButtonIsDisabled = () => {
    if (product) {
      const isItemInCart = state.shoppingCart.find(item => item.id === product.id);
      let newAmount = 0;
      state.shoppingCart.map(item => {
        return newAmount += item.amount
      })

      if (!isItemInCart) {
        return state.totalAmount <= 10 && state.totalAmount + amount <= 10 ? false : true
      } else {
        return state.totalAmount <= 10 && newAmount - isItemInCart.amount + amount <= 10 ? false : true
      }
    }
  }

  const getTotal = () => {
    let total = 0;
    let itemPrice = 0;

    state.shoppingCart.map(item => {
      itemPrice = item.price * item.amount
      return total += itemPrice
    })
    return total.toFixed(2);
  }

  useEffect(() => {
    fetch('products.json')
      .then(response => response.json())
      .then(data => dispatch({ type: "LIST_PRODUCTS", payload: data }));

  }, [])

  return (
    <>
      <Layout>
        <h1>CART</h1>

        <CartSelection state={state} selectProduct={selectProduct} amount={amount} handleClick={handleClick} setAmount={setAmount} product={product} checkIfButtonIsDisabled={checkIfButtonIsDisabled()} />
        
        <div className="cart__products">
          <div className={`box ${error !== '' ? "cart__error-message" : "hidden"}`}>{error}</div>
          <div className="cart__message">
            <p>Price: {product !== undefined ? product.price : "0"}</p>
            <p>x</p>
            <p className="total">{!isNaN(amount) ? amount : 'invalid number'}</p>
            <p>TOTAL: {product !== undefined && !(isNaN(amount)) ? (Number(product.price) * Number(amount)).toFixed(2) : "0"} €</p>
          </div>
          <div className="cart__table">
            {state.shoppingCart.length ? (
              <>
                <table>
                  <tbody>
                    <tr>
                      <th>PRODUCT NAME</th>
                      <th>UNIT PRICE</th>
                      <th>AMOUNT</th>
                      <th>PRICE</th>
                      <th></th>
                    </tr>
                    {state.shoppingCart.map(product => (
                      <tr key={product.id}>
                        <th>
                          {product.productName}
                        </th>
                        <th>{product.price}</th>
                        <th>{product.amount}</th>
                        <th>{product !== undefined ? (Number(product.price) * Number(product.amount)).toFixed(2) : "0"} €</th>
                        <th>
                          <button className="cart__button-remove-product" onClick={() => removeTheProduct(product.id)}>REMOVE</button></th>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </>
            ) : (
              <div className="cart__empty">
                <h2>Cart is empty</h2>
              </div>
            )}
          </div>
        </div>

        <div className="cart__final">
          <div className="cart__final-total">
            <h3 className="cart__final-total-message">{state.totalAmount >= 10 ? "You reached the limit of ten items." : ""}</h3>
          </div>
          <div className="cart__final-total">
            TOTAL TO PAY: <h3>{getTotal()} €</h3>
          </div>
          <div className="cart__final-checkout">
            <Button disabled={state.totalAmount < 1 ? true : false} onClick={clearCart} buttonClass={"danger"}>EMPTY CART</Button>
            <Button disabled={state.totalAmount < 1 ? true : false} onClick={buyItems} buttonClass={"primary"}>BUY</Button>
          </div>
        </div>
        
      </Layout>
      <Modal open={modal} toggle={toggle}>
        <div className="cart__modal-text">
          <h3>Yaay!!! You finished your shopping!</h3>
        </div>
      </Modal>
    </>
  )
}

export default App;
