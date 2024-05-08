import { configureStore, combineReducers } from '@reduxjs/toolkit';
import {
  TypedUseSelectorHook,
  useDispatch as dispatchHook,
  useSelector as selectorHook
} from 'react-redux';
import { constructorBurger } from './ConstructorBurgerSlices';
import { feed } from './FeedSlice';
import { Order } from './OrderSlice';
import { user } from './UserSlice';

export const rootReducer = combineReducers({
  // Заменить на импорт настоящего редьюсера
  constructorBurger: constructorBurger,
  order: Order,
  user: user,
  feed: feed
});

export const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production'
});

export type RootState = ReturnType<typeof rootReducer>;

export type AppDispatch = typeof store.dispatch;

export const useDispatch: () => AppDispatch = () => dispatchHook();
export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;

export default store;
