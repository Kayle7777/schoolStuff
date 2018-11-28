import React from 'react';

export const Row = ({classes, children}) => (
    <div className={`row${classes?" "+classes:""}`}>
        {children}
    </div>
)
