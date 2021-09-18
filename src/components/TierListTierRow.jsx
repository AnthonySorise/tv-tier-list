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
import ItemsGrid from "./ItemsGrid";
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';

const TierListTierRow = (props) => {
    const {state, dispatch, episodeData, isEpisodeDataLoaded} = useContext(Context);
    return (
        <Box sx={{height:"115px", margin:"0", backgroundColor: props.tierColor}}>
            <Grid container spacing={0} sx={{height:"100%"}}>
                <Grid item xs={1} sx={{display:"flex", justifyContent:"center", alignItems:"center", fontSize:"2em"}}>
                    {props.tierLabel}
                </Grid>
                <Grid item xs={11}>
                    {state.tierOrder[props.index] 
                    ?
                    <SortableContext items={state.tierOrder[props.index]} strategy={rectSortingStrategy}>
                        <ItemsGrid>

                        </ItemsGrid>
                    </SortableContext>
                    : null }
                </Grid>
            </Grid>
        </Box>
    );
};
export default TierListTierRow;
