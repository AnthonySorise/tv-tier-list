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
    const {state, dispatch, episodeData, numberOfSeasons, isEpisodeDataLoaded} = useContext(Context);
    
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
        dispatch({ type: reducerActions.updateItemBeingDragged, payload: null });

        const activeContainer = active.data.current.sortable.containerId;
        const isMovingToNewRow = state.rowBeingAddedTo && state.rowBeingAddedTo !== activeContainer;

        if (!over && !isMovingToNewRow) {
            return;
        }

        if (active?.id !== over?.id) {   
            const overContainer = isMovingToNewRow 
                ? state.rowBeingAddedTo 
                : over.data.current?.sortable.containerId || over.id;
            const overIndex = isMovingToNewRow 
                ? state.rowBeingAddedTo === "holding" ? 0 : state.tierOrder[state.rowBeingAddedTo].length 
                : over.id in state.tierOrder
                    ? state.tierOrder[overContainer].length + 1
                    : over.data.current.sortable.index;
            const activeIndex = active.data.current.sortable.index;

            let newOrder = isMovingToNewRow
            ?
                {
                    ...state.tierOrder,
                    [activeContainer]: removeAtIndex(state.tierOrder[activeContainer], activeIndex),
                    [overContainer]: insertAtIndex(state.tierOrder[overContainer], overIndex, active.id)
                }
            :
                {
                    ...state.tierOrder,
                    [overContainer]: arrayMove(
                        state.tierOrder[overContainer],
                        activeIndex,
                        overIndex
                    )
                }
            dispatch({ type: reducerActions.updateTierOrder, payload: newOrder });
            console.log(newOrder);
        }
    };

    function handleDragCancel() {
        dispatch({ action: reducerActions.updateItemBeingDragged, payload: null });
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
                        <Item episodeId={state.itemBeingDragged} style={{opacity:0.85}}/>
                    : null}
                </DragOverlay>
            </Box>
        </DndContext>
    );
};
export default TierList;