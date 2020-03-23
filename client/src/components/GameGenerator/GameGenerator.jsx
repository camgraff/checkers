import React from 'react';

import "./GameGenerator.scss";


export default class GameGenerator extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            gameURL: null
        };
    }

    createGame() {
        const url = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);

        this.setState({
            gameURL: url
        });

        window.open("/game/" + url, "_blank");
    }


    render() {
        return (
            <div className="gameGenerator">
                <button onClick={() => this.createGame()}>Create Game</button>
            </div>
        );
    }
}