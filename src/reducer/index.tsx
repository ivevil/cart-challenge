import { StateInterface, ActionInterface, ProductInterface } from "../globalTypes";
import { Product } from "../model/Product";

export const initialState: StateInterface = {
    products: [],
    product: { id: '', productName: '', maxAmount: 0, amount: 0, price: 0 },
    shoppingCart: []
}

export const reducerFn = (state: StateInterface, action: ActionInterface): StateInterface => {
    const { type, payload, select } = action

    switch (type) {
        case "LIST_PRODUCTS":
            return {
                ...state,
                products: payload as ProductInterface[]
            }
        case "SELECT_A_PRODUCT":
            return {
                ...state,
                product: select as ProductInterface
            }
        case "ADD_TO_CART":
            let newCart = state.shoppingCart
            let selectedItem = state.product

            const isItemInCart = newCart.find(item => item.id === selectedItem.id);

            if (isItemInCart) {
                newCart.map(item =>
                    item.id === selectedItem.id && item.amount >= selectedItem.amount
                        ? { ...item, amount: item.amount + selectedItem.amount }
                        : item
                )
                return {
                    ...state,
                    shoppingCart: newCart
                }
            } else {
                newCart.push(payload as ProductInterface)
                newCart[0].amount = selectedItem.amount;
                return {
                    ...state,
                    shoppingCart: newCart
                }
            }
        case "REMOVE_THE_PRODUCT":
            let prevCart = state.shoppingCart

            const objWithIdIndex = prevCart.findIndex((item) => item.id === payload);
            
            if (objWithIdIndex > -1) {
                prevCart.splice(objWithIdIndex, 1);
            }

            return {
                ...state,
                shoppingCart: prevCart
            }
        default: return state
    }
}