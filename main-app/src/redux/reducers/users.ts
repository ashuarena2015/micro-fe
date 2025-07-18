// import axiosInstance from '../axios';
import {
    createSlice,
    // createAsyncThunk
} from '@reduxjs/toolkit';

// Initial state
const initialState = {
    users: [],
    loginUser: {}
};

// Reducer

const usersReducer = createSlice({
    name: 'users',
    initialState,
    reducers: {
        getUsers: (state, action) => {
            state.users =  action.payload.users
        },
        setLoginUser: (state, action) => {
            state.loginUser =  action.payload.loginUser
        }
    }
})
export const { getUsers, setLoginUser } = usersReducer.actions;
export default usersReducer.reducer;
