import React from 'react'
import { useState } from 'react'
// import Table from '../../components/table_layout/table_layout';
import './view.css'
import Table from '../../components/table_layout/table_layout';

function View(props) {

  const { id, selectContent} = props.propsObject;
  //api/session/:session_id/views/view_id ---> using fetch, renders tables
  const list = [
    { id: 1, title: 'layout 1' },
    { id: 2, title: 'layout 2' },
    { id: 3, title: 'layout 3' },
  ];

  return (

    <>
      <div className='view-wrapper' >
        <div className='view-title'>
          {`View ${id}`}
        </div>
        <ul className='list-unstyled'>
          <li>
            <Table id={0} selectContent={selectContent}/>
          </li>
          <li>
            <Table id={1} selectContent={selectContent}/>
          </li>
          <li>
            <Table id={2} selectContent={selectContent}/>
          </li>

        </ul>
      </div>
    </>
  )
}

export default View 
