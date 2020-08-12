//Import libraries
import React, { useState, useRef } from 'react';

//Import components
import Title from '../UI/Title/Title';
// import Board from '../Board/Board';
import ToDo from '../ToDo/ToDo';


//Import scoped class modules
import classes from './Project.module.scss';

//Stateless component
const Project = (props) => {

    // This will be changed with the data came from the server and useState will be converted
    // To the data from the serve
    const [list, setList] = useState([
        { title: 'Tasks', items: ['1', '2', '3'] },
        { title: 'Progress', items: ['4', '5', '6'] },
        { title: 'Completed', items: ['9', '8', '7'] },
    ]);

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
            setList(oldList => {
                // Deeply create a new state with the old state instead of a reference
                let newList = JSON.parse(JSON.stringify(oldList));
                // Change the item position on the data
                console.log(params);
                console.log(params.grpI);
                console.log(newList[params.grpI]);
                newList[params.grpI].items.splice(params.itemI, 0, newList[currentItem.grpI].items.splice(currentItem.itemI, 1)[0]);
                // Store the new params on the reference
                dragItem.current = params;
                // Return the new list to be stored
                return newList;
            });
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
        if (currentItem.grpI === params.grpI && currentItem.itemI === params.itemI) {
            console.log('Im moving now change my styles');
            return true;
        };
    };

    return (
        <div className={classes.Project}>
            {/* TITLE */}
            <Title title="Project Title" />
            {/* BOARDS */}
            <div className={classes.Project__boards}>
                {/* <Board title='Tasks' />
                <Board title='In Progress' />
                <Board title='Completed' /> */}
                {list.map((grp, grpI) => (
                    <div key={grp} className={classes.Board}>
                        <h2>{grp.title}</h2>
                        <div className={classes.Board__wrapper}>
                            {/* Make the ToDo draggable */}
                            {/* With handleDragStart we pass the event, the item id and the board id */}
                            {grp.items.map((item, itemI) => (
                                <ToDo
                                    // Should be item index
                                    title={item}
                                    key={item}
                                    isDraggable={true}
                                    dragStart={(e) => handleDragStart(e, { grpI, itemI })}
                                    // Happens on the items that accept this events
                                    dragEnter={dragging ? (e) => { handleDragEnter(e, { grpI, itemI }) } : null}
                                    idDragging={dragging}
                                    // If is dragging, then change the class
                                    hasDragClass={dragging ? getStyles({ grpI, itemI }) : null}
                                />
                            ))}
                            {/* <ToDo
                                isDraggable={true}
                                dragStart={(e) => handleDragStart(e, { title: grp.title, id: grpI })}
                                // Happens on the items that accept this events
                                dragEnter={dragging ? (e) => { handleDragEnter(e, { title: grp.title, id: grpI }) } : null}
                                idDragging={dragging}
                                // If is dragging, then change the class
                                hasDragClass={dragging ? getStyles({ title: grp.title, id: grpI }) : null}
                            />
                            <ToDo
                                isDraggable={true}
                                dragStart={(e) => handleDragStart(e, { title: grp.title, id: grpI })}
                                // Happens on the items that accept this events
                                dragEnter={dragging ? (e) => { handleDragEnter(e, { title: grp.title, id: grpI }) } : null}
                                idDragging={dragging}
                                // If is dragging, then change the class
                                hasDragClass={dragging ? getStyles({ title: grp.title, id: grpI }) : null}
                            /> */}
                        </div>
                    </div>
                ))}
            </div>
            {/* CONTROLLERS */}
        </div>

    );
};

export default Project;