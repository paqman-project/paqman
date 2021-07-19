import React from "react"
import { useDrop } from "react-dnd"

/**
 * Droppable creates a div, which allows items wrapped with Draggable to be
 * dragged to. You must specify the allowed item types.
 * @param props
 * @param props.acceptItemTypes The item types that are accepted. Couterpart to Draggables itemType prop.
 * @param props.dropFunc Signature: `function (item): any`. This function is called with the dragged item,
 * when it is released in this area.
 * @param props.className The divs classNames.
 * @param props.canDropClassName The classNames that will be applied, if a Draggable object that is accepted by
 * this Droppable is currently dragged anywhere on the site.
 * @param props.isOverClassName The classNames that will be applied, if a Draggable object that is accepted by
 * this Droppable is currently dragged over this div.
 */
export default function Droppable({
    acceptItemTypes,
    dropFunc,
    className,
    canDropClassName,
    isOverClassName,
    children,
}) {
    const [{ canDrop, isOver }, dropRef] = useDrop(() => ({
        accept: acceptItemTypes,
        collect: monitor => ({
            canDrop: monitor.canDrop(),
            isOver: monitor.isOver(),
        }),
        drop: dropFunc,
    }))

    return (
        <div
            ref={dropRef}
            className={`${className} ${canDrop && canDropClassName} ${
                isOver && isOverClassName
            }`}
        >
            {children}
        </div>
    )
}
