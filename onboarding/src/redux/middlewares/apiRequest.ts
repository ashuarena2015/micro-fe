import axiosInstance from '../axios';
import { Dispatch } from 'redux';

const api = ({ dispatch }: { dispatch: Dispatch }) => (next: (action: any) => any) => async (action: any) => {
    if(action.type !== 'apiRequest') {
        return next(action);
    }


    try {
        const { url, method, data, onSuccess, onError, dispatchType} = action.payload;
        console.log('action.payload', action.payload);
        const response = await axiosInstance({
            url,
            data,
            method
        });
        if(dispatchType === 'accountDetails') {
            dispatch({
                type: 'user/getUser',
                payload: {
                    user: response?.data
                }
            })
            return onSuccess(response);
        }
        dispatch({
            type: 'GLOBAL_MESSAGE',
            payload: {
                message: 'All data fetched successfully!',
                msgType: 'success'
            }
        })
    } catch (error) {
        if (error && typeof error === 'object' && 'response' in error) {
            console.log({ error: (error as any).response });
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
    }

}

export default api;
