import Modal from './components/UI/Modal'
import CartSelection from './components/Cart/CartSelection';
import CartTable from './components/Cart/CartTable';
import CartMessages from './components/Cart/CartMessages';
import CartTotal from './components/Cart/CartTotal';
import { Layout } from './components/UI/Layout';
import { useEffect, useState, useReducer } from 'react';
import { reducerFn, initialState } from './reducer';
import { ProductInterface } from "./globalTypes";

const App: React.FC = () => {

  const [state, dispatch] = useReducer(reducerFn, initialState);
  const [amount, setAmount] = useState<number>(1)
  const [error, updateMessageError] = useState<string>('')
  const [modal, showModal] = useState(false);
  const [selAmount, setSelectedAmount] = useState<string>('')

  const selectProduct = (id: string) => {
    const value = id;

    if (value !== undefined && value !== "0") {
      dispatch({
        type: "SELECT_A_PRODUCT", payload: product, select: state?.products.find(
          product => product.id === value
        ) as ProductInterface
      })
    }
  }

  const product: ProductInterface = state?.products.find(
    product => product.id === state.product.id
  ) as ProductInterface

  const handleClick = () => {
    if (isNaN(amount) || amount === 0) {
      updateMessageError("Sorry, you need to select valid number as an amount!");
    } else if (product === undefined) {
      updateMessageError("Sorry, you need to pick a product!");
    } else if (amount > product.maxAmount) {
      updateMessageError("Sorry, there is no enough items. There is/are only " + product.maxAmount + " available!");
    } else {
      product.amount = amount;
      dispatch({ type: "ADD_TO_CART", payload: product })
      updateMessageError("");
    }
  }

  const removeTheProduct = (id: string) => {
    dispatch({ type: "REMOVE_THE_PRODUCT", payload: id })
  }

  const clearCart = () => {
    dispatch({ type: "CLEAR_CART", payload: product })
  }

  const buyItems = () => {
    toggle();
    dispatch({ type: "CLEAR_CART", payload: product })
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

  const calculateTotal = (price: number, amount: number) => window.setTimeout(function () { 
    let selectedAmount = (price * amount).toFixed(2) 
    setSelectedAmount(selectedAmount);
  }, 1000)

  useEffect(() => {
    fetch('products.json')
      .then(response => response.json())
      .then(data => dispatch({ type: "LIST_PRODUCTS", payload: data }));
  }, [])

  if(product) calculateTotal(product.price, amount);

  return (
    <>
      <Layout>
        <h1>CART</h1>
        <CartSelection state={state} selectProduct={selectProduct} amount={amount} handleClick={handleClick} setAmount={setAmount} product={product} checkIfButtonIsDisabled={checkIfButtonIsDisabled()} />
        <div className="cart__products">
          <CartMessages error={error}>
            <p>PRICE: {product !== undefined ? product.price : "0"} €</p>
            <p>AMOUNT: {!isNaN(amount) ? amount : 'invalid number'}</p>
            <p>TOTAL: {selAmount} €</p>
          </CartMessages>
          <CartTable state={state} removeTheProduct={removeTheProduct}></CartTable>
        </div>
        <CartTotal state={state} getTotal={getTotal()} clearCart={clearCart} buyItems={buyItems} />
      </Layout>
      <Modal open={modal} toggle={toggle}>
        <h3>Yaay!!! Successfuly bought items!</h3>
      </Modal>
    </>
  )
}

export default App;
