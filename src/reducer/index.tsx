import { StateInterface, ActionInterface, ProductInterface } from "../globalTypes";

export const initialState: StateInterface = {
    products: [],
    product: { id: '', productName: '', maxAmount: 0, amount: 0, price: 0 },
    shoppingCart: [],
    totalAmount: 0
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

                let newAmount = 0;
                newCart.map(item => {
                    newAmount += item.amount
                    return item.id === selectedItem.id && item.amount >= selectedItem.amount
                        ? { ...item, amount: item.amount + selectedItem.amount }
                        : item
                })

                return {
                    ...state,
                    shoppingCart: newCart,
                    totalAmount: newAmount
                }
            } else {
                newCart.push(payload as ProductInterface)
                let newAmount = state.totalAmount;
                newCart.map(item =>
                    newAmount = state.totalAmount + item.amount
                )

                return {
                    ...state,
                    shoppingCart: newCart,
                    totalAmount: newAmount
                }
            }
        case "REMOVE_THE_PRODUCT":
            let prevCart = state.shoppingCart

            const objWithIdIndex = prevCart.findIndex((item) => item.id === payload);

            if (objWithIdIndex > -1) {
                prevCart.splice(objWithIdIndex, 1);
            }

            let newAmount = 0;
            prevCart.map(item =>
                newAmount += item.amount
            )

            return {
                ...state,
                shoppingCart: prevCart,
                totalAmount: newAmount
            }
        case "CLEAR_CART":
            return {
                ...state,
                shoppingCart: [],
                totalAmount: 0
            }
        default: return state
    }
}