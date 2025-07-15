import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ListGroup from 'react-bootstrap/ListGroup';
import Badge from 'react-bootstrap/Badge';
import Alert from 'react-bootstrap/Alert';
import type { RootState } from '../../redux/store';

type User = {
    name: string;
    email: string;
    // add other fields if needed
};

const Users = () => {

    const dispatch = useDispatch();
    // Replace 'RootState' with the actual type of your Redux root state if different
     // adjust the import path as needed
    const { user } = useSelector((state: RootState) => state.userReducer) as unknown as { user: User };
    const { message: globalMessage, msgType } = useSelector((state: RootState) => state.globalReducer)

    const [messageVariant, setMessageVariant] = useState(msgType);
    const [showMessage, setShowMessage] = useState(true);

    useEffect(() => {
        setMessageVariant(msgType === 'error' ? 'danger' : msgType);
    }, [msgType])
    
    useEffect(() => {
        dispatch({
            type: 'apiRequest',
            payload: {
                url: 'users',
                method: 'GET',
                onSuccess: 'users/getUsers',
                onError: 'GLOBAL_MESSAGE'
            }
        });
    }, []);
    return (
        <>
            <h2>Users</h2>
            {globalMessage && showMessage && <Alert onClose={() => setShowMessage(false)} key={messageVariant} dismissible variant={messageVariant}>{globalMessage}</Alert>}
        </>
    )
}

export default Users;
