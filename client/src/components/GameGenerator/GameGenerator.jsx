import React from 'react';
import Button from 'react-bootstrap/Button';
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

        window.open(process.env.REACT_APP_BASE_URL + "/game/" + url, "_self");
    }


    render() {
        return (
            <div className="gameGenerator">
                <Button onClick={() => this.createGame()}>Click to start a game!</Button> 
            </div>
        );
    }
}