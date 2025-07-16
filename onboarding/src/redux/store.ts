import { configureStore, Tuple } from "@reduxjs/toolkit";
import rootReducer from "./reducers";
import apiOnboarding from './middlewares/apiRequest.onboarding';
// import error from './middlewares/apiRequest';

console.log("✅ Child store.ts initialized");

export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(...[apiOnboarding]),
});

// ✅ Define RootState type
export type RootState = ReturnType<typeof store.getState>;

// ✅ Optional: Export AppDispatch type too
export type AppDispatch = typeof store.dispatch;

// export default store;
