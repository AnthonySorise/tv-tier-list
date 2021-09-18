import React, { useState, useEffect, useReducer, createContext } from "react";
import {reducer} from './useReducer'
import {reducerActions} from './useReducer'
import useAPI from './useAPI';
import tiers from './models/tiers';
import { arrayMove, insertAtIndex, removeAtIndex } from "./utils/array";
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
// import {
//     arrayMove
// } from "@dnd-kit/sortable";
import photos from "./photos.json";

export const Context = createContext([]);
function App() {
    const initialState = {
        selectedShowID: 551,//-1,
        tierOrder:{},
        itemBeingDragged: null
    }
    const [state, dispatch] = useReducer(reducer, initialState);
    const { episodeData, isEpisodeDataLoaded } = useAPI('https://api.tvmaze.com/shows/' + state.selectedShowID + '/episodes');

    useEffect(function(){
        if(isEpisodeDataLoaded && episodeData){
            let initialTierOrder = {};
            for(let i = 0; i < tiers.length; i++){
                initialTierOrder[tiers[i].label] = [];
            }
            let initialHoldingOrder = Object.keys(episodeData);
            initialTierOrder["holding"] = initialHoldingOrder;
            console.log("!!", initialTierOrder)
            dispatch({type: reducerActions.updateTierOrder, payload: initialTierOrder});
        }
    }, [isEpisodeDataLoaded])  

    const sensors = useSensors(useSensor(MouseSensor), useSensor(TouchSensor));

    function handleDragStart(event) {
        dispatch({type: reducerActions.updateItemBeingDragged, payload: event.active.id})
    }

    const handleDragOver = ({ active, over }) => {
        const overId = over?.id;
        if (!overId) {
            return;
        }

        const activeContainer = active.data.current.sortable.containerId;
        const overContainer = over.data.current?.sortable.containerId || over.id;

        if (activeContainer !== overContainer) {
            const activeIndex = active.data.current.sortable.index;
            const overIndex =
                over.id in state.tierOrder
                    ? state.tierOrder[overContainer].length + 1
                    : over.data.current.sortable.index;

            let newOrder = moveBetweenContainers(
                state.tierOrder,
                activeContainer,
                activeIndex,
                overContainer,
                overIndex,
                active.id
            );

            dispatch({type:reducerActions.updateTierOrder, payload: newOrder});
        }
    };
    const handleDragEnd = ({ active, over }) => {
        if (!over) {
            
            dispatch({type: reducerActions.updateItemBeingDragged, payload: null})
            return;
        }

        if (active.id !== over.id) {
            const activeContainer = active.data.current.sortable.containerId;
            const overContainer = over.data.current?.sortable.containerId || over.id;
            const activeIndex = active.data.current.sortable.index;
            const overIndex =
                over.id in state.tierOrder
                    ? state.tierOrder[overContainer].length + 1
                    : over.data.current.sortable.index;

            let newOrder;
            if (activeContainer === overContainer) {
                newOrder = {
                    ...state.tierOrder,
                    [overContainer]: arrayMove(
                        state.tierOrder[overContainer],
                        activeIndex,
                        overIndex
                    ),
                };
            } else {
                newOrder = moveBetweenContainers(
                    state.tierOrder,
                    activeContainer,
                    activeIndex,
                    overContainer,
                    overIndex,
                    active.id
                );
            }

            dispatch({type:reducerActions.updateTierOrder, payload: newOrder});
        }
        dispatch({type: reducerActions.updateItemBeingDragged, payload: null})
    };

    const moveBetweenContainers = (
        items,
        activeContainer,
        activeIndex,
        overContainer,
        overIndex,
        item
    ) => {
        return {
            ...items,
            [activeContainer]: removeAtIndex(items[activeContainer], activeIndex),
            [overContainer]: insertAtIndex(items[overContainer], overIndex, item),
        };
    };


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
                        onDragOver={handleDragOver}
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
