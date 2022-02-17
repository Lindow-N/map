import React from 'react'
import Marker from './testMarkers';


export default function MarkersList(props) {

    return props.tab.map((todo) => (
    <>
        <Marker  data = {todo} 
        
        delete={props.delete}
        Edit={props.Edit}
        
        />

    </>
      )


)
}