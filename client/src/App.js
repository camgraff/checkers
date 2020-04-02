import React from 'react';

import Board from './components/Board/Board';
import GameGenerator from './components/GameGenerator/GameGenerator';

import { BrowserRouter as Router, Route } from 'react-router-dom';

import './App.scss';
import TurnVisual from './components/TurnVisual/TurnVisual';

const App = () => {
    return (
        <Router basename={process.env.REACT_APP_BASE_URL}>
            <Route path='/' exact component={GameGenerator} />
            <Route path='/game/:id' exact component={Board} />
            <Route path='/test' exact component={TurnVisual} />
            
        </Router>
    );
};

export default App;
