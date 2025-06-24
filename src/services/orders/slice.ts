import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { getFeedsApi, getOrdersApi, getOrderByNumberApi } from '@api';
import { TOrdersData, TOrder } from '@utils-types';

export const fetchFeeds = createAsyncThunk(
  'orders/feeds',
  async () => await getFeedsApi()
);

export const fetchUserOrders = createAsyncThunk(
  'orders/userOrders',
  async () => await getOrdersApi()
);

export const fetchOrderInfo = createAsyncThunk(
  'orders/info',
  async (number: number) => {
    const res = await getOrderByNumberApi(number);
    return res.orders[0];
  }
);

interface OrdersState {
  feeds: TOrdersData | null;
  userOrders: TOrder[];
  currentOrder: TOrder | null;
  loading: boolean;
  error: string | null;
}

const initialState: OrdersState = {
  feeds: null,
  userOrders: [],
  currentOrder: null,
  loading: false,
  error: null
};

const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchFeeds.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        fetchFeeds.fulfilled,
        (state, action: PayloadAction<TOrdersData>) => {
          state.loading = false;
          state.feeds = action.payload;
        }
      )
      .addCase(fetchFeeds.rejected, (state) => {
        state.loading = false;
        state.error = 'Не удалось загрузить заказы';
      })
      .addCase(
        fetchUserOrders.fulfilled,
        (state, action: PayloadAction<TOrder[]>) => {
          state.userOrders = action.payload;
        }
      )
      .addCase(
        fetchOrderInfo.fulfilled,
        (state, action: PayloadAction<TOrder>) => {
          state.currentOrder = action.payload;
        }
      );
  }
});

export default ordersSlice.reducer;
