import { createSlice, nanoid, PayloadAction } from "@reduxjs/toolkit";

interface Product {
  id: number;
  name: string;
  description: string;
  imgurl: string;
  seller: string;
  price: number;
  classification: string;
}

interface CartItem {
  id: string;
  product: Product;
}

interface CartState {
  cart: CartItem[];
}

const initialState: CartState = {
  cart: [],
}

export const CartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<Product>) => {
      const cartItem: CartItem = {
        id: nanoid(),
        product: action.payload,
      };
      state.cart.push(cartItem);
    },
    deleteCartItem: (state, action: PayloadAction<string>) => {
      state.cart = state.cart.filter((cart) => cart.id !== action.payload);
    },
  },
});

export const { addToCart, deleteCartItem } = CartSlice.actions;
export default CartSlice.reducer;
