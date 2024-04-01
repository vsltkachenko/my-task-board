import { Action, ThunkAction, configureStore } from '@reduxjs/toolkit'
import appReducer from './appReducer'
import { api } from './services/api'

export const store = configureStore({
    reducer: {
        [api.reducerPath]: api.reducer,
        app: appReducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(api.middleware)
})



export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    RootState,
    unknown,
    Action<string>
>
