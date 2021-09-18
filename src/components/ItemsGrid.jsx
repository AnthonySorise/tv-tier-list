import React, { useState } from "react";

const ItemsGrid = ({ children }) => {
    const [columns, setColumns] = useState(8);
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
export default ItemsGrid;