export interface ProductInterface {
    id: string;
    productName: string;
    maxAmount: number;
    taxRate?: number;
    price: number;
}

export interface StateInterface {
    products: ProductInterface[];
    shoppingCart: ProductInterface[];
}

export interface ActionInterface{
    type: string;
    payload: unknown;
  }