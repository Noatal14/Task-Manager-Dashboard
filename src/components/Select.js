import React, { useState } from 'react';
import { connect } from "react-redux";
import * as actions from './../store/actions';

function Select(props) {
    const [opened, setOpened] = useState(false);
    const [selectedOptions, setSelectedOptions] = useState([]);

    const onClickOption = (e) => {
        const id = String(e.currentTarget.id);
        if(selectedOptions.includes(id)) {
            setSelectedOptions([...selectedOptions.filter(option => option !== id)]);
            props.title === 'Assignee' ? props.removeAssigneeFilter(id) : props.removeStatusFilter(id);
        
        } else {
            setSelectedOptions([...selectedOptions, id]);
            props.title === 'Assignee' ? props.addAssigneeFilter(id) : props.addStatusFilter(id);
        }
    }

    return (
        <div id='select'>
            <div id='select-title' onClick={e => setOpened(!opened)}>
                <p>{props.title}</p>
                {selectedOptions.length > 0 &&
                    <span className='options-counter-circle'>{selectedOptions.length}</span>
                }
                <i className="arrow-down"></i>
            </div>
            {opened &&
            <ul>
            {
                props.options.map((option, index) => {
                return (
                        <li className={selectedOptions.includes(String(props.data[index].id)) ? 'dark-background' : 'light-background'} id={String(props.data[index].id)} key={index} onClick={e => onClickOption(e)}>
                            <input checked={selectedOptions.includes(String(props.data[index].id))} type='checkbox' onChange={e => {}} />
                            <p>{option}</p>
                        </li>
                        )
                })
            }
            </ul>
            }
        </div>
    )
}

const mapStateToProps = state => ({

})

const mapDispatchToProps = dispatch => ({
    addAssigneeFilter: (filter) => {
        dispatch(actions.addAssigneeFilter(filter));
    },

    removeAssigneeFilter: (filter) => {
        dispatch(actions.removeAssigneeFilter(filter));
    },

    addStatusFilter: (filter) => {
        dispatch(actions.addStatusFilter(filter));
    },

    removeStatusFilter: (filter) => {
        dispatch(actions.removeStatusFilter(filter));
    }
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Select);