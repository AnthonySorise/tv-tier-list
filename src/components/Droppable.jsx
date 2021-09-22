import React, { useState, useReducer, useContext } from "react";
import {Context} from '../App.jsx';
import { reducerActions } from '../useReducer';
import { useDroppable } from "@dnd-kit/core";
import { rectSortingStrategy, SortableContext } from "@dnd-kit/sortable";

import ItemsGrid from "./ItemsGrid";
import SortableItem from "./SortableItem";


const Droppable = ({ id }) => {
    const { setNodeRef } = useDroppable({ id });
    const {state, dispatch, episodeData, isEpisodeDataLoaded} = useContext(Context);


    const onMouseOver = () =>{
        if(state.itemBeingDragged){
            if(id != state.updateRowBeingAddedTo){
                dispatch({type:reducerActions.updateRowBeingAddedTo, payload:id});
            }
        }
        else{
            dispatch({type:reducerActions.updateRowBeingAddedTo, payload:null});
        }
    }
    const onMouseLeave = () =>{
        dispatch({type:reducerActions.updateRowBeingAddedTo, payload:null});
    }


    return (    
        <div onMouseOver={onMouseOver} onMouseLeave={onMouseLeave} style={{height:"99%", minHeight:"152px"}}>
                {state.tierOrder[id] 
                ?
                <SortableContext id={id} key={id} items={state.tierOrder[id]} strategy={rectSortingStrategy} style={{width:"100%"}}>
                    <ItemsGrid id={id}>
                        {state.tierOrder[id]
                            ?
                            state.tierOrder[id].map((episodeId, index) => (
                                <SortableItem key={episodeId} episodeId={episodeId} index={index} />
                            ))
                            : null}
                    </ItemsGrid>
                </SortableContext>
                : null }
        </div>
    );
};

export default Droppable;
