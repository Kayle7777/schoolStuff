import React from 'react';

export const Container = ({fluid, children, classes}) => (
    <div className={`container${fluid?"-fluid":""}${classes?" " + classes:""}`}>
        {children}
    </div>
)
