import { combineReducers } from "redux";
import userReducer from "./users";
import globalReducer from "./global";

const appReducer = combineReducers({
  parentRedux: combineReducers({
    userReducer,
    globalReducer
  })
});

const rootReducer = (state: any, action: any) => {
  return appReducer(state, action);
};

export default rootReducer;
