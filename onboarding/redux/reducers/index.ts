import { combineReducers } from "redux";
import globalReducer from "./global";
import userReducer from "./user";

const appReducer = combineReducers({
    globalReducer,
    userReducer
});

const rootReducer = (state: any, action: any) => {
  return appReducer(state, action);
};

export default rootReducer;