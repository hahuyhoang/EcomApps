import { createSlice } from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";
const initialState = [];

const cartSlice = createSlice({
  name: "cartFavorite",
  initialState,
  reducers: {
    addToCartFavorite(state, { payload }) {
      // console.log(payload);
      const { id } = payload;
      const find = state.find((item) => item.id === id);
      if (find) {
        return state.map((item) =>
          item.id === payload
            ? {
                ...item,
              }
            : item
        );
      } else {
        state.push({
          ...payload,
          quantity: 1,
        });
      }
    },
    removeItem: (state, action) => {
      const itemId = action.payload;
      return state.filter((item) => item.id !== itemId);
    },
    clear(state) {
      return [];
    },
  },
});

export const { addToCartFavorite, removeItem, clear } = cartSlice.actions;
const cartFavorite = cartSlice.reducer;

export default cartFavorite;
