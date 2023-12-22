import { createSlice, nanoid, PayloadAction } from "@reduxjs/toolkit";

interface Product {
  id: string; 
  name: string;
  description: string;
  imgurl: string;
  seller: string;
  price: number;
  classification: string;
  offer: number;
}

interface CartItem {
  id: string;
  product: Product;
  quantity: number;
}

interface CartState {
  cart: CartItem[];
  totalCost: number;
}

const initialState: CartState = {
  cart: [],
  totalCost:0,
};

export const CartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<Product>) => {
      const existingItem = state.cart.find((item) => item.product.id === action.payload.id);
      
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        const cartItem: CartItem = {
          id: nanoid(),
          product: { ...action.payload, offer: action.payload.offer || 0 }, 
          quantity: 1,
        };
        state.cart.push(cartItem);
      }
    },
    
    
    deleteCartItem: (state, action: PayloadAction<string>) => {
      state.cart = state.cart.filter((cart) => cart.id !== action.payload);
    },
    incrementQuantity: (state, action: PayloadAction<string>) => {
      const cartItem = state.cart.find((item) => item.id === action.payload);
      if (cartItem) {
        cartItem.quantity = (cartItem.quantity || 1) + 1;
      }
    },
    decrementQuantity: (state, action: PayloadAction<string>) => {
      const cartItem = state.cart.find((item) => item.id === action.payload);
      if (cartItem && cartItem.quantity > 1) {
        cartItem.quantity = (cartItem.quantity || 1) - 1;
      }
    },
    setTotalCost: (state, action: PayloadAction<number>) => {
      state.totalCost = action.payload;
    },
  },
});

export const { addToCart, deleteCartItem, incrementQuantity, decrementQuantity ,setTotalCost} = CartSlice.actions;
export default CartSlice.reducer;
