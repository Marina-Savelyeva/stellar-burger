import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getOrderByNumberApi, getOrdersApi, orderBurgerApi } from '@api';
import { TOrder } from '@utils-types';

export const getOrders = createAsyncThunk('orders/getOrders', getOrdersApi);

export const createOrder = createAsyncThunk(
  'order/createOrder',
  async (data: string[]) => {
    const response = orderBurgerApi(data);
    return response;
  }
);

export const getOrderByNumber = createAsyncThunk(
  'order/getOrderByNumberApi',
  getOrderByNumberApi
);

type IOrder = {
  order: TOrder[];
  isLoading: boolean;
  orderData: TOrder | null;
};

const initialState: IOrder = {
  order: [],
  isLoading: false,
  orderData: null
};

const OrderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    clear: (state) => {
      state.orderData = null;
    }
  },
  selectors: {
    getOrder: (state) => state.order,
    getOrderData: (state) => state.orderData,
    getLoading: (state) => state.isLoading
  },
  extraReducers: (builder) => {
    builder.addCase(getOrders.pending, (state) => {
      //перед
      state.isLoading = true;
    }),
      builder.addCase(getOrders.fulfilled, (state, action) => {
        state.isLoading = false;
        state.order = action.payload;
      }),
      builder.addCase(getOrders.rejected, (state) => {
        state.isLoading = false;
      }),
      builder.addCase(createOrder.pending, (state) => {
        //перед
        state.isLoading = true;
      }),
      builder.addCase(createOrder.fulfilled, (state, action) => {
        state.isLoading = false;
        state.orderData = action.payload.order;
      }),
      builder.addCase(createOrder.rejected, (state) => {
        state.isLoading = false;
      }),
      builder.addCase(getOrderByNumber.pending, (state) => {
        //перед
        state.isLoading = true;
      }),
      builder.addCase(getOrderByNumber.fulfilled, (state, action) => {
        state.isLoading = false;
        state.order = action.payload.orders;
      }),
      builder.addCase(getOrderByNumber.rejected, (state) => {
        state.isLoading = false;
      });
  }
});

export const { getOrder, getOrderData, getLoading } = OrderSlice.selectors;
export const { clear } = OrderSlice.actions;
export const Order = OrderSlice.reducer;
