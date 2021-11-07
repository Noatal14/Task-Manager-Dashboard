import './../assets/css/table.css';
import React, { useEffect, useState } from 'react';
import { connect } from "react-redux";
import { findStateById, stringNameById, organizeDate } from './../helpers/utils';
import * as actions from './../store/actions';
import TableRow from './TableRow';

function Table(props) {
    const [renderedTable, setRendredTable] = useState([]);

    const renderTable = (node, spacing, newTable) => {
        let newRow = <TableRow 
                            onClick={onClickRow} 
                            spacing={spacing} 
                            task={node} 
                            id={node.id}
                            title={node.data.title}
                            assignee={stringNameById(node.data.assignees)}
                            status={findStateById(node.data.status)}
                            dueDate={organizeDate(node.data.dueData)}
                            clickable={node.clickable}
                            key={node.id}
                            isOpened={node.isOpened}
                        />
        if(node.hasChildren) {
            for(let i = 0; i < node.length; i++) {
                newRow = ([newRow, renderTable(node.children[i], spacing + 1, newTable)]);
            }
        }
        return(newRow);
    }

    useEffect(() => {
        let newTable = [];
        for(let i = 0; i < props.displayedTasks.length; i++) {
            newTable.push(renderTable(props.displayedTasks[i], 1, newTable));
        }
        setRendredTable([...newTable]);
    }, [props.displayedTasks])

    const onClickRow = (node) => {
        node.isOpened ? props.removeTask(node) : props.addTask(node);
    }
    
    return (
        <div id='table'>
            <div className='line'>
                <h3 className='task-title-container'>Task</h3>
                <h3>Assignee</h3>
                <h3>Status</h3>
                <h3>Due Date</h3>
            </div>

            {renderedTable}
        </div>
    )
}

const mapStateToProps = state => ({
    ...state
})

const mapDispatchToProps = dispatch => ({
    addTask: (taskNode) => {
        dispatch(actions.addTask(taskNode));
    },

    removeTask: (taskNode) => {
        dispatch(actions.removeTask(taskNode));
    },
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Table);