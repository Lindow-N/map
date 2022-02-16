import React from 'react'
import { RiCloseCircleLine } from 'react-icons/ri';
import { TiEdit } from 'react-icons/ti';
import Marker from './testMarkers';


export default function MarkersList(props) {


    return props.tab.map((todo) => (
    <>
        <Marker  data = {todo} 
        
        delete={props.delete}
        />

    </>
      )


)
}