import React, { useState, useEffect, useRef } from 'react';
import Autocomplete from "react-google-autocomplete";


const API_KEY = "'AIzaSyDE19jz0Ojpx2q-mepUlNKjlH5mUvrkHsM'";



function TodoForm(props) {
  var [input, setInput] = useState(props.edit ? props.edit.value : '');

  const inputRef = useRef(null);

  const handleSelect = async value => {};
 

  useEffect(() => {
    inputRef.current.focus();
  });

  const handleChange = e => {
    setInput(e.target.value);
  };

  const handleSubmit = e => {
    e.preventDefault();
    props.onSubmit({
      id: Math.floor(Math.random() * 10000),
      text: input
    });
    setInput('');
  };


  return (
    <form onSubmit={handleSubmit} className='todo-form'>
      {props.edit ? (
        <>
          <input
            placeholder='Update your item'
            value={input}
            onChange={handleChange}
            name='text'
            ref={inputRef}
            className='todo-input edit'
          />
          <button onClick={handleSubmit} className='todo-button edit'>
            Update
          </button>
        </>
      ) : (
        <>
  

      <Autocomplete
    apiKey= {API_KEY}
    placeholder='Ajouter une ville'
    value={input}
    onChange={handleChange}
    onSelect={handleSelect}
    name='text'
    className='todo-input'
    ref={inputRef}
    onPlaceSelected={(place) => {
      console.log(place);
        console.log(place.address_components[0].long_name);
    }}
  
    
    
   
  
/>;

          <button onClick={handleSubmit} className='todo-button'>
            Ajouter
          </button>
        </>
      )}
    </form>
  );
}

export default TodoForm;
