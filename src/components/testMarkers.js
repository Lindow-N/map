import React, { useState } from 'react';
import MapContainer from './test';
import { RiCloseCircleLine } from 'react-icons/ri';
import { TiEdit } from 'react-icons/ti';


const Markers = ({ markers, completemarkers, removemarkers, updatemarkers }) => {
    const [edit, setEdit] = useState({
      id: null,
      name: ''
    });
  
    const submitUpdate = name => {
      updatemarkers(edit.id, name);
      setEdit({
        id: null,
        name: ''
      });
    };
  
    if (edit.id) {
      return <MapContainer edit={edit} onSubmit={submitUpdate} />;
    }
  
    return markers.map((markers, index) => (
      
      <div
        className={markers.isComplete ? 'todo-row complete' : 'todo-row'}
        key={index}
      >
        <div key={markers.id} onClick={() => completeTodo(markers.id)}>
          {markers.text}
        </div>
        <div className='icons'>
          <RiCloseCircleLine
            onClick={() => removeTodo(markers.id)}
            className='delete-icon'
          />
         <TiEdit
            onClick={() => setEdit({ id: markers.id, name: markers.text })}
            className='edit-icon'
          />
        </div>
      </div>
    ));
  };
  
  export default Markers;
  