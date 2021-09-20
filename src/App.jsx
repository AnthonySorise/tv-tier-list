import React, { useState, useEffect, useReducer, createContext } from "react";
import { reducer } from './useReducer'
import { reducerActions } from './useReducer'
import useAPI from './useAPI';
import tiers from './models/tiers';
import { arrayMove, insertAtIndex, removeAtIndex } from "./utils/array";
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Search from './components/Search'
import TierList from './components/TierList'
import './App.css';
import {
    closestCorners,
    closestCenter,
    DndContext,
    MouseSensor,
    TouchSensor,
    KeyboardSensor,
    useSensor,
    useSensors
} from "@dnd-kit/core";
import { sortableKeyboardCoordinates } from "@dnd-kit/sortable";
import photos from "./photos.json";

export const Context = createContext([]);
function App() {
    const initialState = {
        selectedShowID: -1,
        tierOrder: {},
        itemBeingDragged: null
    }
    const [state, dispatch] = useReducer(reducer, initialState);
    const { episodeData, isEpisodeDataLoaded } =  useAPI('https://api.tvmaze.com/shows/' + state.selectedShowID + '/episodes');

    useEffect(function () {
        if (isEpisodeDataLoaded && episodeData) {
            let initialTierOrder = {};
            for (let i = 0; i < tiers.length; i++) {
                initialTierOrder[tiers[i].label] = [];
            }

            let initialHoldingOrder = Object.keys(episodeData);
            initialTierOrder["holding"] = initialHoldingOrder;



            dispatch({ type: reducerActions.updateTierOrder, payload: initialTierOrder });
        }
    }, [isEpisodeDataLoaded, episodeData])

    const sensors = useSensors(
        useSensor(MouseSensor),
        useSensor(TouchSensor),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        })
    );

    function handleDragStart(event) {
        dispatch({ type: reducerActions.updateItemBeingDragged, payload: event.active.id })
    }

    const handleDragEnd = ({ active, over }) => {
        const activeContainer = active.data.current.sortable.containerId;
        const isMovingToNewRow = state.rowBeingAddedTo && state.rowBeingAddedTo !== activeContainer;

        if (!over && !isMovingToNewRow) {
            dispatch({ type: reducerActions.updateItemBeingDragged, payload: null });
            return;
        }

        if (active?.id !== over?.id) {   
            const overContainer = isMovingToNewRow ? state.rowBeingAddedTo : over.data.current?.sortable.containerId || over.id;
            const activeIndex = active.data.current.sortable.index;
            const overIndex = isMovingToNewRow 
                ? state.rowBeingAddedTo === "holding" ? 0 : state.tierOrder[state.rowBeingAddedTo].length 
                : over.id in state.tierOrder
                    ? state.tierOrder[overContainer].length + 1
                    : over.data.current.sortable.index;

            let newOrder;
            if(isMovingToNewRow){
                newOrder = moveBetweenContainers(
                    state.tierOrder,
                    activeContainer,
                    activeIndex,
                    overContainer,
                    overIndex,
                    active.id
                );
            }
            else if (activeContainer === overContainer) {
                newOrder = {
                    ...state.tierOrder,
                    [overContainer]: arrayMove(
                        state.tierOrder[overContainer],
                        activeIndex,
                        overIndex
                    ),
                };
            } 

            dispatch({ type: reducerActions.updateTierOrder, payload: newOrder });
            console.log(newOrder)
        }
        dispatch({ type: reducerActions.updateItemBeingDragged, payload: null })
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
        dispatch({ action: reducerActions.updateItemBeingDragged, payload: null })
    }

    return (
        <Context.Provider value={{ dispatch, state, episodeData, isEpisodeDataLoaded }}>
            <Container maxWidth="xl">
                <Typography component="div" style={{ backgroundColor: '#cfe8fc', textAlign: 'center', minHeight: '100vh', cursor:(state.itemBeingDragged)?'grabbing':"" }}>
                    <div className="header">
                        TV Tier List
                    </div>

                    <Search />

                    <DndContext
                        sensors={sensors}
                        // collisionDetection={closestCenter}
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
