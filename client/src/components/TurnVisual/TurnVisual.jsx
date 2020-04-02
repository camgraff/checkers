import React from 'react';
import PropTypes from "prop-types";
import './TurnVisual.scss';

export default function TurnVisual(props) {
    return (
        <div className='turnContainer'>
            <div className='turns'>
                <h1>{props.whoseTurn === 1 && <span className='active'></span>}Player 1</h1>
                <h1>{props.whoseTurn === 2 && <span className='active'></span>}Player 2</h1>
            </div>
        </div>
    );
}

TurnVisual.propTypes = {
    whoseTurn: PropTypes.number.isRequired
};
