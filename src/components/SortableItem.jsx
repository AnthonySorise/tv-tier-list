import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

import Item from './Item';

const SortableItem = (props) => {
    const sortable = useSortable({ id: props.episodeId });
    const {
        attributes,
        listeners,
        isDragging,
        setNodeRef,
        transform,
        transition,
    } = sortable;

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    };

    return (
        <Item
            ref={setNodeRef}
            style={style}
            {...props}
            {...attributes}
            {...listeners}
        />
    );
};
export default SortableItem;