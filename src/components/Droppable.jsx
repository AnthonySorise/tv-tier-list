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


    const onMouseEnter = (e) =>{            
        if(state.itemBeingDragged){
            if(id != state.rowBeingAddedTo){
                dispatch({type:reducerActions.updateRowBeingAddedTo, payload:id});
            }
        }
        else if (state.updateRowBeingAddedTo != null){
            dispatch({type:reducerActions.updateRowBeingAddedTo, payload:null});
        }
    }

    const onTouchMove = (e) => {
        if(e.changedTouches && e.changedTouches.length && e.changedTouches[0].clientX && e.changedTouches[0].clientY){
            let id = document.elementFromPoint(e.changedTouches[0].clientX, e.changedTouches[0].clientY).getAttribute("rowID");


            if(state.itemBeingDragged && id){
                if(id != state.rowBeingAddedTo){
                    dispatch({type:reducerActions.updateRowBeingAddedTo, payload:id});
                }
            }
            else if (state.updateRowBeingAddedTo != null){
                dispatch({type:reducerActions.updateRowBeingAddedTo, payload:null});
            }
        }
    }

    return (    
        <div onMouseEnter={onMouseEnter} onTouchMove={onTouchMove} style={{height:"99%", minHeight:"152px"}} rowID={id}>
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
