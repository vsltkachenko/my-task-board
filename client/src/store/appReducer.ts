import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { CategoryType, HistoryType } from './types'

export const appSlice = createSlice({
    name: 'app',
    initialState: {
        modalType: '',
        modalActive: false,
        currentCategoryId: null as number | null,
        currentCategoryName: null as string | null,
        currentTaskId: null as number | null,
        allCategory: [] as CategoryType[],
        allHistory: [] as HistoryType[]
    },
    reducers: {
        modalOpen(state) {
            state.modalActive = true
        },
        modalClose(state) {
            state.modalActive = false
        },
        setModalType(state, action: PayloadAction<string>) {
            state.modalType = action.payload
        },
        setCurrentCategoryId(state, action: PayloadAction<number | null>) {
            state.currentCategoryId = action.payload
        },
        setCurrentCategoryName(state, action: PayloadAction<string | null>) {
            state.currentCategoryName = action.payload
        },
        setCurrentTaskId(state, action: PayloadAction<number | null>) {
            state.currentTaskId = action.payload
        },
        setAllCategory(state, action: PayloadAction<CategoryType[]>) {
            state.allCategory = action.payload
        },
        setHistory(state, action: PayloadAction<HistoryType[]>) {
            state.allHistory = action.payload
        }
    },
    extraReducers: () => {}
})

export const {
    modalOpen,
    setAllCategory,
    modalClose,
    setModalType,
    setCurrentTaskId,
    setCurrentCategoryId,
    setCurrentCategoryName,
    setHistory
} = appSlice.actions
export default appSlice.reducer
