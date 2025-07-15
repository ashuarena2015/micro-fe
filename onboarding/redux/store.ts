import { configureStore, Tuple } from "@reduxjs/toolkit";
import rootReducer from "./reducers";
import onboardingApi from './middlewares/onboardingApiRequests';
// import error from './middlewares/apiRequest';

const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(...[onboardingApi]),
});

// ✅ Define RootState type
export type RootState = ReturnType<typeof store.getState>;

// ✅ Optional: Export AppDispatch type too
export type AppDispatch = typeof store.dispatch;

export default store;
