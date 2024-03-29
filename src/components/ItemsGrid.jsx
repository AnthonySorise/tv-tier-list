import React, { useMemo } from "react";
import useWindowSize from '../useWindowSize';

const ItemsGrid = React.forwardRef((props, ref) => {
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
            ref={ref}
            style={{
                display: 'grid',
                gridTemplateColumns: `repeat(${columns}, 1fr)`,
                gridGap: 10,
                padding: 0,
                height:'100%',
            }}
            tierid = {props.id}
        >
            {props.children}
        </div>
    );
});

ItemsGrid.displayName = 'ItemsGrid';

export default ItemsGrid;