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
    const {state, dispatch, episodeData, numberOfSeasons, isEpisodeDataLoaded} = useContext(Context);
    return (
        <Box mt={1}>
            {state.tierOrder["holding"]
            ?
                <Droppable id={"holding"}/>
            :   state.selectedShowID != -1 ? <CircularProgress sx={{marginTop:"2em"}}/> : null }
        </Box>
    );
};
export default TierListHoldingRow;
