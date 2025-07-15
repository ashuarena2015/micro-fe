import { combineReducers } from "redux";
import todoListReducer from "./todolist";
import userReducer from "./users";
import globalReducer from "./global";

const appReducer = combineReducers({
    todoListReducer,
    userReducer,
    globalReducer
});

const rootReducer = (state: any, action: any) => {
  return appReducer(state, action);
};

export default rootReducer;