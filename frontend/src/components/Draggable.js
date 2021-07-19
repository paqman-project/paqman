import React from "react"
import { useDrag } from "react-dnd"

/**
 * Draggable creates a draggable object that can be dragged to a Droppable
 * component. Specify the itemType and itemObject to be dragged.
 * @param props 
 * @param props.itemType The item types that is the Draggable. Couterpart to 
 * Droppables acceptItemTypes prop.
 * @param props.itemObject The javascript object, with with the Droppables 
 * dropFunc function is called.
 */
export default function Draggable({ itemType, itemObject, children }) {
    const [{ opacity }, dragRef] = useDrag(
        () => ({
            type: itemType,
            item: itemObject,
            collect: monitor => ({
                opacity: monitor.isDragging() ? 0.5 : 1
            })
        })
    )

    return (
        <div ref={dragRef} style={{opacity}}>
            {children}
        </div>
    )
}