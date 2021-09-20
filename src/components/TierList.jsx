import {useContext, useEffect} from 'react';
import {Context} from '../App.jsx'
import { reducerActions } from '../useReducer'
import {
    DragOverlay,
    DndContext,
    MouseSensor,
    TouchSensor,
    KeyboardSensor,
    useSensor,
    useSensors
} from "@dnd-kit/core";
import {

    sortableKeyboardCoordinates
} from "@dnd-kit/sortable";
import { arrayMove, insertAtIndex, removeAtIndex } from "../utils/array";
import tiersModel from '../models/tiers'
import Item from './Item'
import Box from '@mui/material/Box';
import TierListTierRow from './TierListTierRow';
import TierListHoldingRow from './TierListHoldingRow';

const TierList = (props) => {
    const {state, dispatch, episodeData, isEpisodeDataLoaded} = useContext(Context);
    
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
        <DndContext
            sensors={sensors}
            // collisionDetection={closestCenter}
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
            onDragCancel={handleDragCancel}
        >
            <Box component="div" m={1}>
                {
                    tiersModel ? 
                    tiersModel.map(function(tierModel, i){
                        return(
                        <TierListTierRow index={i} tierLabel={tierModel.label} tierColor={tierModel.color} key={tierModel.label}/>
                        )
                    })
                    :null
                }
                <TierListHoldingRow index={tiersModel.length} key={tiersModel.length}/>
                <DragOverlay adjustScale={false} style={{pointerEvents:"none"}}>
                    {state.itemBeingDragged 
                    ?
                        <Item episodeId={state.itemBeingDragged} style={{opacity:0.85, cursor:"grabbing"}}/>
                    : null}
                </DragOverlay>
            </Box>
        </DndContext>
    );
};
export default TierList;