import React, { useState, useReducer, useContext } from "react";
import {Context} from '../App';
import {
    DragOverlay,
} from "@dnd-kit/core";
import {
    arrayMove,
    SortableContext,
    rectSortingStrategy
} from "@dnd-kit/sortable";
import ItemsGrid from "./ItemsGrid";
import SortableItem from "./SortableItem";
import Item from "./Item";
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';

const TierListHoldingRow = (props) => {
    const {state, dispatch, episodeData, isEpisodeDataLoaded} = useContext(Context);
    return (
        <Box sx={{height:"calc(100vh - 650px)", overflow:"auto"}}>
            {state.tierOrder[props.index]
            ?
            <div>
                <SortableContext items={state.tierOrder[props.index]} strategy={rectSortingStrategy}>
                    <ItemsGrid>
                    {state.tierOrder[props.index]
                    ?
                        state.tierOrder[props.index].map((episodeId, index) => (
                            <SortableItem key={episodeId} episodeId={episodeId} index={index} />
                        ))
                    : null}
                    </ItemsGrid>
                </SortableContext>
                <DragOverlay adjustScale={false}>
                    {state.itemBeingDragged 
                    ?
                        <Item episodeId={state.itemBeingDragged} index={state.tierOrder[props.index].indexOf(state.itemBeingDragged)} style={{opacity:0.85, cursor:"grabbing"}}/>
                    : null}
                </DragOverlay>
            </div>
            :   <CircularProgress /> }
        </Box>
    );
};
export default TierListHoldingRow;
