import { getFeedsApi } from '@api';
import { PayloadAction, createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';

export const feedsApi = createAsyncThunk(
  'getFeedOrdersApi/getFeedsApi',
  getFeedsApi
); //асинхронная операция

type IFeed = {
  feeds: TOrder[];
  total: number;
  todayTotal: number;
  isLoading: boolean;
};

const initialState: IFeed = {
  feeds: [],
  total: 0,
  todayTotal: 0,
  isLoading: false
};

const FeedSlice = createSlice({
  name: 'feed',
  initialState,
  reducers: {},
  selectors: {
    getFeed: (state) => state.feeds,
    getLoading: (state) => state.isLoading,
    getTodayTotal: (state) => state.todayTotal,
    getTotal: (state) => state.total
  },
  extraReducers: (builder) => {
    //3 экшена
    builder.addCase(feedsApi.pending, (state) => {
      //перед
      state.isLoading = true;
    }),
      builder.addCase(feedsApi.fulfilled, (state, action) => {
        //если без ошибок
        state.isLoading = false;
        state.feeds = action.payload.orders;
        state.todayTotal = action.payload.totalToday;
        state.total = action.payload.total;
      }),
      builder.addCase(feedsApi.rejected, (state) => {
        //если с ошибкой
        state.isLoading = false;
      });
  }
});

export const { getFeed, getLoading, getTodayTotal, getTotal } =
  FeedSlice.selectors;
export const Feed = FeedSlice.reducer;
