import axios from 'axios';
import { Middleware, MiddlewareAPI, Dispatch, AnyAction } from 'redux';

const error: Middleware<{}, any> = (store) => (next) => (action: unknown) => {
    if (typeof action === 'object' && action !== null && 'type' in action && (action as any).type === 'GLOBAL_MESSAGE') {
        return next(action);
    } else {
        return next(action);
    }
}

export default error;
