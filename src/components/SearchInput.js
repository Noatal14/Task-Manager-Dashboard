import React, { useState } from "react";
import { connect } from 'react-redux';
import * as actions from './../store/actions';

function SearchInput(props) {
    const [searchedInput, setSearchedInput] = useState('');

    const onChangeInput = (e) => {
        setSearchedInput(e.currentTarget.value);
    }

    const search = (e) => {
        if(e.key === 'Enter' && searchedInput !== '') {
            props.addSerachFilter(searchedInput);
            setSearchedInput('');
        }
    }

    return (
        <div className='input-container'>
            <i className='zmdi zmdi-search'></i>
            <input type='text' placeholder='Search a task...' onChange={e => onChangeInput(e)} value={searchedInput} onKeyDown={e => search(e)} />
        </div>
    )
}

const mapStateToProps = state => ({

})

const mapDispatchToProps = dispatch => ({
    addSerachFilter: (input) => {
        dispatch(actions.addSerachFilter(input));
    },
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SearchInput);