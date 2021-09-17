import React, { useState, useEffect, useReducer, createContext } from "react";
import {reducer} from './useReducer'
import {reducerActions} from './useReducer'
import useAPI from './useAPI';
import tiers from './models/tiers'
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import TierList from './components/TierList'
import './App.css';
import {
    closestCenter,
    DndContext,
    MouseSensor,
    TouchSensor,
    useSensor,
    useSensors
} from "@dnd-kit/core";
import {
    arrayMove
} from "@dnd-kit/sortable";
import photos from "./photos.json";

export const Context = createContext([]);
function App() {
    const initialState = {
        selectedShowID: 551,//-1,
        tierOrder:[],
        itemBeingDragged: null
    }
    const [state, dispatch] = useReducer(reducer, initialState);
    const { episodeData, isEpisodeDataLoaded } = useAPI('https://api.tvmaze.com/shows/' + state.selectedShowID + '/episodes');

    useEffect(function(){
        if(isEpisodeDataLoaded && episodeData){
            let initialTierOrder = [];
            for(let i = 0; i < tiers.length; i++){
                initialTierOrder.push([]);
            }
            let initialHoldingOrder = [];
            for(let i = 0; i < episodeData?.length; i++){
                initialHoldingOrder.push(i);
            }
            //initialTierOrder.push(initialHoldingOrder);
            initialTierOrder.push(photos);//TESTING
            dispatch({type:"updateTierOrder", payload: initialTierOrder});
        }
    }, [isEpisodeDataLoaded])  

    const sensors = useSensors(useSensor(MouseSensor), useSensor(TouchSensor));

    function handleDragStart(event) {
        dispatch({type: reducerActions.updateItemBeingDragged, payload: event.active.id})
    }
    function handleDragEnd(event) {
        const { active, over } = event;
        if (active.id !== over.id) {
            const oldIndex = state.tierOrder[5].indexOf(active.id);
            const newIndex = state.tierOrder[5].indexOf(over.id);

            let updatedRow = arrayMove(state.tierOrder[5], oldIndex, newIndex);
            dispatch({type:"updateTierOrder", payload: [[], [], [], [], [], updatedRow]});
        }
        dispatch({type: reducerActions.updateItemBeingDragged, payload: null})
    }
    function handleDragCancel() {
        dispatch({action: reducerActions.updateItemBeingDragged, payload: null})
    }

    return (
        <Context.Provider value={{dispatch, state, episodeData, isEpisodeDataLoaded}}>
            <Container maxWidth="xl">
                <Typography component="div" style={{ backgroundColor: '#cfe8fc', height: '100vh', textAlign: 'center' }}>
                    <div className="header">
                        TV Tier List
                    </div>

                    <DndContext
                        sensors={sensors}
                        collisionDetection={closestCenter}
                        onDragStart={handleDragStart}
                        onDragEnd={handleDragEnd}
                        onDragCancel={handleDragCancel}
                    >
                        <TierList />
                    </DndContext>

                </Typography>
            </Container>
        </Context.Provider>

    );
}

export default App;
