import React, { useState, useReducer, useContext } from "react";
import {Context} from '../App.jsx';
import { reducerActions } from '../useReducer';
import { useDroppable } from "@dnd-kit/core";
import { rectSortingStrategy, SortableContext } from "@dnd-kit/sortable";

import ItemsGrid from "./ItemsGrid";
import SortableItem from "./SortableItem";


const Droppable = ({ id }) => {
    const { setNodeRef } = useDroppable({ id });
    const {state, dispatch, episodeData, numberOfSeasons, isEpisodeDataLoaded} = useContext(Context);

    const onMouseOver = (e) =>{            
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
            let touchOverElement = document.elementFromPoint(e.changedTouches[0].clientX, e.changedTouches[0].clientY);
            let id = touchOverElement ? touchOverElement.getAttribute("tierid") : null;

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
    let minFilter = state.minFilter ? state.minFilter : 1;
    let maxFilter = state.maxFilter ? state.maxFilter : numberOfSeasons;
    return (    
        <div onMouseOver={onMouseOver} onTouchMove={onTouchMove} style={{height:"100%", minHeight:"124px"}} tierid={id}>
                {state.tierOrder[id] 
                ?
                <SortableContext id={id} key={id} items={state.tierOrder[id]} strategy={rectSortingStrategy} style={{width:"100%"}}>
                    <ItemsGrid id={id} ref={setNodeRef}>
                        {state.tierOrder[id]
                            ?
                            state.tierOrder[id].map((episodeId, index) => {
                                let season = episodeData[episodeId].season;
                                if(season >= minFilter && season <= maxFilter){
                                    return <SortableItem key={episodeId} episodeId={episodeId} index={index} />
                                }
                            })
                            : null}
                    </ItemsGrid>
                </SortableContext>
                : null }
        </div>
    );
};

export default Droppable;
