import React, { memo } from 'react';
import { Button, Typography } from '@mui/material';

interface SubHeaderProps {
    subheading: string;
}

const SubHeader: React.FC<SubHeaderProps> = (props) => {
    const { subheading } = props;
    return (
        <>
            <Typography variant="h6" component="h2" gutterBottom>{subheading}</Typography>
        </>
    )
}
export default memo(SubHeader);
