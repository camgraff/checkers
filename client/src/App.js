import React from 'react';

import Board from './components/Board/Board';
import GameGenerator from './components/GameGenerator/GameGenerator';

import { BrowserRouter as Router, Route } from 'react-router-dom';

const App = () => {
    return (
        <Router>
            <Route path={process.env.PUBLIC_URL + '/'} exact component={GameGenerator} />
            <Route path={process.env.PUBLIC_URL + '/game/:id'} exact component={Board} />
        </Router>
    );
};

export default App;
