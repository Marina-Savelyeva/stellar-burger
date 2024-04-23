import { PayloadAction, createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getOrderByNumberApi, getOrdersApi, orderBurgerApi } from '@api';
import { TOrder } from '@utils-types';

const getOrders = createAsyncThunk('orders/getOrders', getOrdersApi);

/*export const createOrder = createAsyncThunk(
  'orders/createOrder',
  orderBurgerApi
);*/

export const createOrder = createAsyncThunk(
  'order/createOrder',
  async (data: string[]) => {
    const response = orderBurgerApi(data);
    return response;
  }
);

const getOrderByNumber = createAsyncThunk(
  'order/getOrderByNumberApi',
  getOrderByNumberApi
);

type IOrder = {
  order: TOrder[];
  isLoading: boolean;
  request: boolean;
  orderData: TOrder | null;
};

const initialState: IOrder = {
  order: [],
  isLoading: false,
  request: false,
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
    getRequest: (state) => state.request,
    getLoading: (state) => state.isLoading
  },
  extraReducers: (builder) => {
    builder.addCase(getOrders.pending, (state) => {
      //перед
      state.request = true;
    }),
      builder.addCase(getOrders.fulfilled, (state, action) => {
        state.request = false;
        state.order = action.payload;
      }),
      builder.addCase(getOrders.rejected, (state) => {
        state.request = false;
      }),
      builder.addCase(createOrder.pending, (state) => {
        //перед
        state.request = true;
      }),
      builder.addCase(createOrder.fulfilled, (state, action) => {
        state.request = false;
        state.orderData = action.payload.order;
      }),
      builder.addCase(createOrder.rejected, (state) => {
        state.request = false;
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
        //перед
        state.isLoading = false;
      });
  }
});

export const { getOrder, getOrderData, getRequest, getLoading } =
  OrderSlice.selectors;
export const { clear } = OrderSlice.actions;
export const Order = OrderSlice.reducer;
