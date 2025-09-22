import { combineReducers, createSlice } from '@reduxjs/toolkit'

export const authSlice = createSlice({
    name: 'auth',
    initialState: {
        status: false,
        user: null
    },
    reducers: {
        login: (state, action) => {
            const { user } = action.payload;
            state.status = true,
                state.user = user
        },
        logout: (state) => {
            state.status = false,
                state.user = null
        }
    },
})

export const venueSlicer = createSlice({
    name: 'venue',
    initialState: {
        venues: []
    },
    reducers: {
        setVenues: (state, action) => {
            state.venues = action.payload;
        }

    }
})
export const { login, logout } = authSlice.actions
export const { setVenues } = venueSlicer.actions;

const rootReducer = combineReducers({
    venue: venueSlicer.reducer,
    auth: authSlice.reducer,
});
export default rootReducer;
