import React, { useState, useEffect, useMemo } from "react";
import useWindowSize from '../useWindowSize'

const ItemsGrid = (props) => {
    const width = useWindowSize().width;
    const columns = useMemo(()=>{
        if(width > 1025){
            return 8
        }
        else if(width > 1024){
            return 8
        }
        else if(width > 768){
            return 6
        }
        else return 4
    }, [width])

    return (
        <div
            style={{
                display: 'grid',
                gridTemplateColumns: `repeat(${columns}, 1fr)`,
                gridGap: 10,
                padding: 0,
                height:'100%',
            }}
            tierID = {props.id}
        >
            {props.children}
        </div>
    );
}
export default ItemsGrid;