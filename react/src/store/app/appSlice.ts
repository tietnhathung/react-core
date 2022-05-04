import { createSlice } from '@reduxjs/toolkit'

export interface AppState {
    unfoldableSidebar : boolean,
    hideSidebar : boolean,
}

const initialState: AppState = {
    unfoldableSidebar : false,
    hideSidebar : false
}

export const appSlice = createSlice({
    name: 'app',
    initialState,
    reducers: {
        toggleHideSidebar: (state) => {
            state.hideSidebar = !state.hideSidebar;
        },
        toggleUnfoldableSidebar: (state) => {
            state.unfoldableSidebar = !state.unfoldableSidebar;
        }
    },
})

export const { toggleHideSidebar,toggleUnfoldableSidebar } = appSlice.actions

export default appSlice.reducer
