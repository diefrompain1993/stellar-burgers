import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import {
  getFeedsApi,
  getOrdersApi,
  getOrderByNumberApi,
  orderBurgerApi
} from '@api';
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

export const createOrder = createAsyncThunk(
  'orders/create',
  async (ids: string[]) => {
    const res = await orderBurgerApi(ids);
    return res.order;
  }
);

interface OrdersState {
  feeds: TOrdersData | null;
  userOrders: TOrder[];
  currentOrder: TOrder | null;
  createdOrder: TOrder | null;
  orderRequest: boolean;
  loading: boolean;
  error: string | null;
}

const initialState: OrdersState = {
  feeds: null,
  userOrders: [],
  currentOrder: null,
  createdOrder: null,
  orderRequest: false,
  loading: false,
  error: null
};

const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    clearCreatedOrder: (state) => {
      state.createdOrder = null;
    },
    setFeeds: (state, action: PayloadAction<TOrdersData>) => {
      state.feeds = action.payload;
    },
    setUserOrders: (state, action: PayloadAction<TOrder[]>) => {
      state.userOrders = action.payload;
    }
  },
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
      )
      .addCase(createOrder.pending, (state) => {
        state.orderRequest = true;
        state.createdOrder = null;
      })
      .addCase(
        createOrder.fulfilled,
        (state, action: PayloadAction<TOrder>) => {
          state.orderRequest = false;
          state.createdOrder = action.payload;
        }
      )
      .addCase(createOrder.rejected, (state) => {
        state.orderRequest = false;
        state.error = 'Не удалось оформить заказ';
      });
  }
});

export const { clearCreatedOrder, setFeeds, setUserOrders } =
  ordersSlice.actions;

export default ordersSlice.reducer;
