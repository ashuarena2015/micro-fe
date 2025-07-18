import axiosInstance from '../axios';
import { Dispatch } from 'redux';

const api = ({ dispatch }: { dispatch: Dispatch }) => (next: (action: any) => any) => async (action: any) => {
    if(action.type !== 'apiRequest') {
        return next(action);
    }

    const { url, method, data, onSuccess, onError, dispatchType } = action.payload;
    try {
        const response = await axiosInstance({
            url,
            data,
            method,
            headers: {
                'Content-Type': 'application/json'
            },
        });
        if(
            dispatchType === 'accountAuthentication'
            || dispatchType === 'accountLogin'
            || dispatchType === 'accountCreation'
            || dispatchType === 'accountVerification'
            || dispatchType === 'accountForgotPassword'
            || dispatchType === 'accountResetPassword'
            || dispatchType === 'accountLogout'
            || dispatchType === 'accountGetUsers'
        ) {
            typeof onSuccess === 'function' && onSuccess(response);
            return response;
        }
        dispatch({
            type: 'GLOBAL_MESSAGE',
            payload: {
                message: 'All data fetched successfully!',
                msgType: 'success'
            }
        })
    } catch (error) {
        if (typeof onError === 'function') {

            if (error && typeof error === 'object' && 'response' in error) {
                return onError(error.response);
            } else {
                console.log({ error });
            }
            dispatch({
                type: 'GLOBAL_MESSAGE',
                payload: {
                    message: error instanceof Error ? error.message : 'An unknown error occurred',
                    msgType: 'error'
                }
            })
            return onError(error);
        }
    }

}

export default api;
