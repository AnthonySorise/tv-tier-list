import {useContext, useEffect} from 'react';
import {Context} from '../App.jsx'
import {
    DragOverlay,
} from "@dnd-kit/core";
import {
    arrayMove,
    SortableContext,
    rectSortingStrategy
} from "@dnd-kit/sortable";
import tiersModel from '../models/tiers'
import Item from './Item'
import Box from '@mui/material/Box';
import TierListTierRow from './TierListTierRow';
import TierListHoldingRow from './TierListHoldingRow';

const TierList = (props) => {
    const {state, dispatch, episodeData, isEpisodeDataLoaded} = useContext(Context);
    return (
        <Box component="div" m={1}>
            {
                tiersModel ? 
                tiersModel.map(function(tierModel, i){
                    return(
                    <TierListTierRow index={i} tierLabel={tierModel.label} tierColor={tierModel.color} key={i}/>
                    )
                })
                :null
            }
            <TierListHoldingRow index={tiersModel.length} key={tiersModel.length}/>
            <DragOverlay adjustScale={false}>
                {state.itemBeingDragged 
                ?
                    <Item episodeId={state.itemBeingDragged} style={{opacity:0.85, cursor:"grabbing"}}/>
                : null}
            </DragOverlay>
        </Box>
    );
};
export default TierList;