import React from 'react';
import './App.css';
import TodoList from './components/TodoList';
import SimpleMap from './map';

function App() {
  return (

    <div className="MainContainer">

    <div className='todo-app'>
      <TodoList />
    </div>
    <div className='map'>
    <SimpleMap></SimpleMap>
    </div>

    </div>
    
  );
}

export default App;
