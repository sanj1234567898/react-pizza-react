import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchPizzas = createAsyncThunk(
  "pizza/fetchPizzaStatus",
  async ({
    categoryId,
    sortByTitle,
    sortByRaiting,
    sortByPrice,
    currentPage,
  }) => {
    const { data } = await axios.get(
      `https://63b041be6a74151a1bbd1a07.mockapi.io/pizza-items?page=${currentPage}&limit=4&${
        categoryId > 0
          ? `category=${categoryId}&sortBy=${
              sortByTitle || sortByRaiting || sortByPrice
            }&order=${sortByPrice ? "asc" : "desc"}`
          : `sortBy=${sortByTitle || sortByRaiting || sortByPrice}`
      }`
    );
    return data;
  }
);

const initialState = {
  items: [],
  status: "loading",
};

const pizzaSlice = createSlice({
  name: "pizza",
  initialState,
  reducers: {
    setItems(state, action) {
      state.items = action.payload;
    },
  },
  extraReducers: {
    [fetchPizzas.fulfilled]: (state, action) => {
      state.items = action.payload;
      state.status = "succes";
    },
    [fetchPizzas.pending]: (state) => {
      state.status = "loading";
      state.items = [];
    },
    [fetchPizzas.rejected]: (state) => {
      state.status = "error";
      state.items = [];
    },
  },
});

export const { setItems } = pizzaSlice.actions;

export default pizzaSlice.reducer;
