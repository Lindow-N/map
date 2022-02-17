import React, { useState } from 'react';
import MapContainer from './test';
import { RiCloseCircleLine } from 'react-icons/ri';
import { TiEdit } from 'react-icons/ti';


export default function Marker(props) {
    

const todo = props.data;



return (                             
    
<div
          className='todo-row ' 
          key={todo.id}
        >
          <div key={todo.id} onClick={() => todo.id}>
            {todo.name}
          </div>
          <div className='icons'>
          <RiCloseCircleLine
          onClick={() => props.delete(todo.id)}
          className='delete-icon'   
        />

          <TiEdit
          onClick={() => props.Edit({ id: todo.id, name: todo.name , edit : true})}
          className='edit-icon'
        />
          </div>
        </div>
   
)

}