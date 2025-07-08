import React from 'react';

interface SnackbarProps {
    snackbarInfo?: {
        message?: string;
        [key: string]: any;
    };
}

export default function SimpleSnackbar(props: SnackbarProps) {

    const { snackbarInfo } = props;

    return (   
       <>{snackbarInfo?.message}</>
    );
}
