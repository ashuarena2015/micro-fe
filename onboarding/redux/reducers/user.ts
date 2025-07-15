import {
    createSlice,
} from '@reduxjs/toolkit';

// Initial state
const initialState = {
    user: {}
};

// Reducer

const userReducer = createSlice({
    name: 'user',
    initialState,
    reducers: {
        getUser: (state, action) => {
            state.user =  {...action.payload.user}
        }
    }
})
export const { getUser } = userReducer.actions;
export default userReducer.reducer;
