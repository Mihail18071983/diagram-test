import { Middleware } from "@reduxjs/toolkit"

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const saveToLocalStorage: Middleware<object,any> =
  (store) => (next) => (action) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const result = next(action)
    localStorage.setItem("reduxState", JSON.stringify(store.getState()))
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return result
  }

export function loadFromLocalStorage() {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  return localStorage.getItem("reduxState")
    ? JSON.parse(localStorage.getItem("reduxState") as string)
    : undefined
}