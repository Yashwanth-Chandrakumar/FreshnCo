import {configureStore} from "@reduxjs/toolkit"
import cartReducer from "./CartSlice"

export const Store = configureStore({
    reducer:{cartReducer,}
})