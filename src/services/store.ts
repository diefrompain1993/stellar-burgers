import { configureStore } from '@reduxjs/toolkit';
import {
  TypedUseSelectorHook,
  useDispatch as dispatchHook,
  useSelector as selectorHook
} from 'react-redux';
import ingredientsReducer from './ingredients/slice';
import constructorReducer from './constructor/slice';
import userReducer from './user/slice';
import ordersReducer from './orders/slice';

const store = configureStore({
  reducer: {
    ingredients: ingredientsReducer,
    constructor: constructorReducer,
    user: userReducer,
    orders: ordersReducer
  },
  devTools: process.env.NODE_ENV !== 'production'
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useDispatch: () => AppDispatch = () => dispatchHook<AppDispatch>();
export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;

export default store;
