import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit"
import flowReducer from "../features/flow/flowSlice"
import {
  saveToLocalStorage,
  loadFromLocalStorage,
} from "./middleware/persistStore"

export const store = configureStore({
  reducer: {
    flow: flowReducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(saveToLocalStorage)
  },
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  preloadedState: loadFromLocalStorage(),
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>