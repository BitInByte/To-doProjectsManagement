//Import libraries
import React, { useState, useRef } from 'react';

//Import components
import ToDo from '../ToDo/ToDo';

//Import scoped class modules
import classes from './Board.module.scss';

//Stateless component
const Board = ({ title }) => {

    const [dragging, setDragging] = useState(false);

    // Reference to hold the item when drag starts
    const dragItem = useRef();

    // Reference to hold the specific node that is moving
    const dragNode = useRef();

    const handleDragStart = (e, params) => {
        // We receive the board, the event and the item id
        console.log('drag starting...', params);
        // Store the item on the reference
        dragItem.current = params;
        // console.log(dragItem);
        // Get the current Node
        dragNode.current = e.target;
        // Set an eventListener to the node
        dragNode.current.addEventListener('dragend', handleDragEnd);
        // Apply the style to the element on the board and no to the element
        // dragging
        setTimeout(() => {
            // Set the darring variable to true
            setDragging(true);
        }, 0);
    };

    const handleDragEnter = (e, params) => {
        console.log('Entering drag...', params);
        console.log('dragNode...', dragNode.current);
        const currentItem = dragItem.current;
        if (e.target !== dragNode.current) {
            // If is not the same element we are entering, then apply it
            console.log('TARGET IS NOT THE SAME!');
        }
    };

    const handleDragEnd = e => {
        console.log('Ending drag');
        // Reseting the references
        setDragging(false);
        dragNode.current.removeEventListener('dragend', handleDragEnd);
        dragItem.current = null;
        dragNode.current = null;
    };

    const getStyles = (params) => {
        // Get the current draga item
        const currentItem = dragItem.current;
        // console.log(dragItem);
        // console.log(params);
        if (currentItem.title === params.title && currentItem.id === params.id) {
            console.log('Im moving now change my styles');
            return true;
        };
    };



    return (
        <div className={classes.Board}>
            <h2>{title}</h2>
            <div className={classes.Board__wrapper}>
                {/* Make the ToDo draggable */}
                {/* With handleDragStart we pass the event, the item id and the board id */}
                <ToDo
                    isDraggable={true}
                    dragStart={(e) => handleDragStart(e, { title, id: '1' })}
                    // Happens on the items that accept this events
                    dragEnter={dragging ? (e) => { handleDragEnter(e, { title, id: '1' }) } : null}
                    idDragging={dragging}
                    // If is dragging, then change the class
                    hasDragClass={dragging ? getStyles({ title, id: '1' }) : null}
                />
                <ToDo
                    isDraggable={true}
                    dragStart={(e) => handleDragStart(e, { title, id: '2' })}
                    // Happens on the items that accept this events
                    dragEnter={dragging ? (e) => { handleDragEnter(e, { title, id: '2' }) } : null}
                    idDragging={dragging}
                    // If is dragging, then change the class
                    hasDragClass={dragging ? getStyles({ title, id: '2' }) : null}
                />
                {/* <ToDo isDraggable={true} dragStart={(e) => handleDragStart(e, { title, id: '2' })} idDragging={dragging} /> */}
                {/* <ToDo isDraggable={true} dragStart={handleDragStart} /> */}
                {/* <ToDo isDraggable={true} /> */}
                {/* <ToDo isDraggable={true} /> */}

            </div>
        </div>
    );
};

export default Board;