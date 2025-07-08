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
    const { users } = useSelector((state: RootState) => state.usersReducer) as { users: User[] };
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
            <ListGroup as="ol" numbered>
                {users?.map((user, index) => {
                    return (
                        <ListGroup.Item as="li" key={index} className="d-flex justify-content-between align-items-start">
                            <div className="ms-2 me-auto">
                                <div className="fw-bold">{user.name}</div>
                                {user.email}
                            </div>
                            <Badge bg="primary" pill>14</Badge>
                        </ListGroup.Item>
                    )
                })}
            </ListGroup>
        </>
    )
}

export default Users;
