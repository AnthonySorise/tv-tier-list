import React, { useState, useReducer, useContext } from "react";
import {Context} from '../App';
import tiersModel from '../models/tiers';
import {
    DragOverlay,
} from "@dnd-kit/core";
import {
    arrayMove,
    SortableContext,
    rectSortingStrategy
} from "@dnd-kit/sortable";

import { ItemsGrid } from "./ItemsGrid";
import { SortableItem } from "./SortableItem";
import { Item } from "./Item";
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import CircularProgress from '@mui/material/CircularProgress';


const TierListHoldingRow = (props) => {
    const {state, dispatch, episodeData, isEpisodeDataLoaded} = useContext(Context);
    return (
        <Box sx={{height:"115px", margin:"0", backgroundColor: props.tierColor}}>
            {state.tierOrder[props.index]
            ?
            <div>
                <SortableContext items={state.tierOrder[props.index]} strategy={rectSortingStrategy}>
                    <ItemsGrid columns={4}>
                    {state.tierOrder[props.index]
                    ?
                        state.tierOrder[props.index].map((url, index) => (
                            <SortableItem key={url} url={url} index={index} />
                        ))
                    : null}
                    </ItemsGrid>
                </SortableContext>
                <DragOverlay adjustScale={true}>
                    {state.itemBeingDragged ? (
                        <Item url={state.itemBeingDragged} index={state.tierOrder[props.index].indexOf(state.itemBeingDragged)} />
                    ) : null}
                </DragOverlay>
            </div>
            :   <CircularProgress /> }
        </Box>
    );
};

export default TierListHoldingRow;
