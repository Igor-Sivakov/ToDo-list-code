import { configureStore } from "@reduxjs/toolkit"
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux"

import listSlice from "./lists/listSlice"
import taskSlice from "./tasks/taskSlice"


export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch


export const store = configureStore({
  reducer: {
    list: listSlice,
    task: taskSlice
  }
})

export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector