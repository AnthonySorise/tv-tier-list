import React, { useState } from "react";

const ItemsGrid = (props) => {
    const [columns, setColumns] = useState(8);
    return (
        <div
            style={{
                display: 'grid',
                gridTemplateColumns: `repeat(${columns}, 1fr)`,
                gridGap: 10,
                padding: 0,
                height:'100%',
            }}
            rowID = {props.id}
        >
            {props.children}
        </div>
    );
}
export default ItemsGrid;