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
        },
        addVenue: (state, action) => {
            state.venues.push(action.payload);
        },
        removeVenue: (state, action) => {
            state.venues = state.venues.filter(v => v.id !== action.payload);
        },
        updateVenueBooking: (state, action) => {
            const booking = action.payload;
            console.log("booking payload", booking);

            state.venues = state.venues.map((v) => {
                // ensure type matches (convert to string for safety)
                if (String(v.id) === String(booking.venue)) {
                    return {
                        ...v,
                        availableTimes: v.availableTimes.filter(
                            (time) => time !== booking.timeSlot
                        ),
                        bookingDetails: [
                            ...v.bookingDetails,
                            {
                                bookedBy: {
                                    bookingId: booking.bookedBy,   
                                    bookingName: booking.bookingName, 
                                },
                                timeSlot: booking.timeSlot,
                            },
                        ],
                        unavailableTimes: [...v.unavailableTimes, booking.timeSlot],
                    };
                }
                return v;
            });

            // To debug safely:
            console.log("Updated Venues:", JSON.parse(JSON.stringify(state.venues)));
        },


    }
})
export const { login, logout } = authSlice.actions
export const { setVenues, addVenue, removeVenue, updateVenueBooking } = venueSlicer.actions;

const rootReducer = combineReducers({
    venue: venueSlicer.reducer,
    auth: authSlice.reducer,
});
export default rootReducer;
