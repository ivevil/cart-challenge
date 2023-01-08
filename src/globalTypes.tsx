export interface ProductInterface {
    id: string;
    productName: string;
    maxAmount: number;
    taxRate?: number;
    amount: number;
    price: number;
}

export interface StateInterface {
    products: ProductInterface[];
    product: ProductInterface;
    shoppingCart: ProductInterface[];
}

export interface ActionInterface{
    type: string;
    payload: unknown;
    select?: unknown;
  }