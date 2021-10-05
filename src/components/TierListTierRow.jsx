import React, { useState, useReducer, useContext } from "react";
import {Context} from '../App.jsx';
import tiersModel from '../models/tiers';
import {
    DragOverlay,
} from "@dnd-kit/core";
import {
    arrayMove,
    SortableContext,
    rectSortingStrategy
} from "@dnd-kit/sortable";
import Droppable from "./Droppable";
import ItemsGrid from "./ItemsGrid";
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';

const TierListTierRow = (props) => {
    const {state, dispatch, episodeData, numberOfSeasons, isEpisodeDataLoaded} = useContext(Context);

    return (
        <Box sx={{height:"100%", margin:"0", backgroundColor: props.tierColor}}>
            <Grid container spacing={0} sx={{height:"100%"}}>
                <Grid item xs={1} sx={{display:"flex", justifyContent:"center", alignItems:"center", fontSize:"2em"}}>
                    {props.tierLabel}
                </Grid>
                <Grid item xs={11} my={1} px={1}>
                    <Droppable id={tiersModel[props.index].label} />
                </Grid>
            </Grid>
        </Box>
    );
};
export default TierListTierRow;
