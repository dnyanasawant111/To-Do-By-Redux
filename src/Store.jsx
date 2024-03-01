import { configureStore } from '@reduxjs/toolkit'
import ToDoSlice from './Redux/ToDoSlice'


export const Store= configureStore({
    reducer: {
      todo: ToDoSlice,
    },
  })