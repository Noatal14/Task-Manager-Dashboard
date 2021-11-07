import React, { useState } from 'react';
import ChangeStatusMenu from './ChangeStatusMenu';

export default function StatusSquare(props) {
    const [isMenuOpened, setIsMenuOpened] = useState(false);

    return (
        <span className='position-relative'>
            <span onClick={e => setIsMenuOpened(!isMenuOpened)} className={`status-square status${props.status.id}`}>{props.status.status}</span>
            {isMenuOpened &&
                <ChangeStatusMenu task={props.task} />
            }
        </span>
    )
}