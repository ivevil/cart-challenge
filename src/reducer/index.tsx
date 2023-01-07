import { StateInterface, ActionInterface, ProductInterface } from "../globalTypes";

export const initialState: StateInterface = {
    products: [],
    product: [],
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
                product: select as ProductInterface[]
            }
        case "ADD_TO_CART":
            let newCart = state.shoppingCart
            newCart.push(payload as ProductInterface)
            return {
                ...state,
                shoppingCart: newCart
            }
        default: return state
    }
}