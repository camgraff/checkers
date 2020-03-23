import React from 'react';

import Board from './components/Board/Board';

import { BrowserRouter as Router, Route } from "react-router-dom";

const App = () => {
  return (
    <Router>
      <Route path="/game/:id" exact component={Board} />
    </Router>
  );
};

export default App;