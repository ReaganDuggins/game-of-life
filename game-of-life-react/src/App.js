import React from 'react';
import logo from './logo.svg';
import './App.css';
import GameOfLife from './components/GameOfLife';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <GameOfLife></GameOfLife>
      </header>
    </div>
  );
}

export default App;
