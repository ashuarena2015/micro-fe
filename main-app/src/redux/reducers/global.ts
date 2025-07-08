// Actions types
const GLOBAL_MESSAGE = 'GLOBAL_MESSAGE';
const GLOBAL_MESSAGE_RESET = 'GLOBAL_MESSAGE_RESET';

// Initial state
const initialState = {
    message: '',
    msgType: ''
};

// Actions
interface GlobalSnackbarMessageParams {
    message: string;
    msgType: string;
    isReset: boolean;
}

export const globalSnackbarMessage = ({ message, msgType, isReset }: GlobalSnackbarMessageParams) => async (dispatch: any) => {
    dispatch({
        type: isReset ? GLOBAL_MESSAGE_RESET : GLOBAL_MESSAGE,
        payload: {
            message,
            msgType
        }
    });
};

// Reducer

interface GlobalAction {
    type: string;
    payload?: {
        message: string;
        msgType: string;
    };
}

const globalReducer = (state = initialState, action: GlobalAction): typeof initialState => {
    console.log({action});
    switch (action.type) {
        case GLOBAL_MESSAGE:
            return {
                ...state,
                message: action.payload?.message || '',
                msgType: action.payload?.msgType || ''
            }
        case GLOBAL_MESSAGE_RESET:
            return {
                ...state,
                message: '',
                msgType: ''
            }
        default:
            return state;
    }
}

export default globalReducer;
