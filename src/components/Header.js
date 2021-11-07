import React from 'react';
import Select from './Select';
import SearchInput from './SearchInput';
import './../assets/css/header.css'
import { assigneesNamesArray } from './../helpers/utils'
import assignees from '../assets/data/assignees.json'
import statuses from '../assets/data/states.json'

export default function Header(props) {
    return (
        <div id='header'>
            <div className='container'>
                <h1>Task Manager</h1>
                <SearchInput />
                <Select title='Assignee' data={assignees} options={assigneesNamesArray()} />
                <Select title='Status' data={statuses} options={['To Do', 'WIP', 'Done']} />
            </div>
        </div>
    )
}