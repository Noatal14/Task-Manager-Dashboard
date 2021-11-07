import React from 'react'
import states from './../assets/data/states.json'
import { connect } from "react-redux";
import * as actions from './../store/actions';

function ChangeStatusMenu(props) {
    
    const onChangeRadio = (e) => {
        props.changeStatus(Number(e.currentTarget.value), props.task)
    } 

    return (
        <div className='status-menu'>
            {states.map((state, index) => {
                return (
                    <div className='menu-line' key={index}>
                        <input type='radio' name='status' value={state.id} onChange={e => onChangeRadio(e)} />
                        <span className={`status-square status${state.id}`}>{state.status}</span>
                    </div>
                )
            }).reverse()}
        </div>
    )
}

const mapStateToProps = state => ({

})

const mapDispatchToProps = dispatch => ({
    changeStatus: (status, task) => {
        dispatch(actions.changeStatus(status, task));
    }
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ChangeStatusMenu);