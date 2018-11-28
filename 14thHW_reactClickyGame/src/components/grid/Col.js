import React from 'react';

export const Col = ({vp, size, children, classes}) => (
    <div className={`col-${vp||"md"}${size && "-" + size}${classes?classes+" ":""}`}>
        {children}
    </div>
);
