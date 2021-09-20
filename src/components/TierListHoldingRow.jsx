import React, { useState, useReducer, useContext } from "react";
import {Context} from '../App.jsx';
import {
    DragOverlay,
} from "@dnd-kit/core";
import {
    arrayMove,
    SortableContext,
    rectSortingStrategy
} from "@dnd-kit/sortable";
import Droppable from "./Droppable";


import Item from "./Item";
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';

const TierListHoldingRow = (props) => {
    const {state, dispatch, episodeData, isEpisodeDataLoaded} = useContext(Context);
    return (
        <Box sx={{height:"auto", overflow:"auto"}}>
            {state.tierOrder["holding"]
            ?
            <div>
                <Droppable id={"holding"}/>
            </div>
            :   state.selectedShowID != -1 ? <CircularProgress sx={{marginTop:"2em"}}/> : <div>Search a show!</div> }
        </Box>
    );
};
export default TierListHoldingRow;
