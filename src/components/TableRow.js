import React from 'react';
import StatusSquare from './StatusSquare';

const LINE_PADDING = 60;

export default function TableRow(props) {

    const handleClick = () => {
        if(props.clickable) {
            props.onClick(props.task);
        }
    }

    return (
        <div className='line'>
            <div style={{'paddingLeft': `${LINE_PADDING * props.spacing / 2}px`, 'cursor': props.clickable && 'pointer'}} className='task-title-container table-item' onClick={e => handleClick()} id={props.id}>
                {props.clickable ?
                    <div className={`arrow ${props.isOpened ? 'down' : 'right'}`}></div>
                :
                    <div className={'no-arrow'}></div>
                }
                <h5>{props.title}</h5>
            </div>
            <p className='table-item'>{props.assignee}</p>
            <StatusSquare task={props.task} status={props.status} />
            <p className='table-item'>{props.dueDate}</p>
        </div>
    )
}