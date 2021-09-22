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
        <Box>
            {state.tierOrder["holding"]
            ?
                <Droppable id={"holding"}/>
            :   state.selectedShowID == -1 ? <CircularProgress sx={{marginTop:"1em"}}/> : <div>Search a show!</div> }
        </Box>
    );
};
export default TierListHoldingRow;
