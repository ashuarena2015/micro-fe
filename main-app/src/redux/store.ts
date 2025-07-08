import { configureStore, Tuple } from "@reduxjs/toolkit";
import rootReducer from "./reducers";
import api from './middlewares/apiRequest';
// import error from './middlewares/apiRequest';

const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(...[api]),
});

// ✅ Define RootState type
export type RootState = ReturnType<typeof store.getState>;

// ✅ Optional: Export AppDispatch type too
export type AppDispatch = typeof store.dispatch;

export default store;
