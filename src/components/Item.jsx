import React, { forwardRef } from 'react';

export const Item = forwardRef(({ url, index, faded, style, ...props }, ref) => {
    const inlineStyles = {
        opacity: faded ? '0.2' : '1',
        transformOrigin: '0 0',
        height: 200,
        backgroundImage: `url("${url}")`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundColor: 'grey',
        ...style,
    };

    return <div ref={ref} style={inlineStyles} {...props} />;
});
