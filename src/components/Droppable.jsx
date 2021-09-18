import React, { useState, useReducer, useContext } from "react";
import {Context} from '../App.jsx';
import { useDroppable } from "@dnd-kit/core";
import { rectSortingStrategy, SortableContext } from "@dnd-kit/sortable";

import ItemsGrid from "./ItemsGrid";
import SortableItem from "./SortableItem";


const Droppable = ({ id }) => {
    const { setNodeRef } = useDroppable({ id });
    const {state, dispatch, episodeData, isEpisodeDataLoaded} = useContext(Context);
    return (
        <SortableContext id={id} key={id} items={state.tierOrder[id]} strategy={rectSortingStrategy}>
            <ItemsGrid>
                {state.tierOrder[id]
                    ?
                    state.tierOrder[id].map((episodeId, index) => (
                        <SortableItem key={episodeId} episodeId={episodeId} index={index} />
                    ))
                    : null}
            </ItemsGrid>
        </SortableContext>
    );
};

export default Droppable;
