import React from 'react';

export function ItemsGrid({ children, columns }) {
    return (
        <div
            style={{
                display: 'grid',
                gridTemplateColumns: `repeat(${columns}, 1fr)`,
                gridGap: 10,
                padding: 10,
            }}
        >
            {children}
        </div>
    );
}
