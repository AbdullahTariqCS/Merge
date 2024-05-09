import React, { useState } from 'react';
import '../../assets/theme.css'
import './sidebar.css'

function SidebarItem({ title, condition, select, newContent }) {

  return (
    <li className="nav-item " style={{ color: '#bdbdbd', fontWeight: 'bold' }}>
      <a className={`nav-link${condition ? ' active' : ''}`} data-toggle="pill" onClick={() => select(newContent)} role="tab">
        {title}
      </a>
    </li>
  )
}
function Create(props) {

  return (
    <li className="nav-item">
      <p className='nav-link m-create m-secondary' onClick={() => props.select({ content_type: 'TableCreate', props: {} })} role="tab">
        + Create Table
      </p>
    </li>
  )
}

function SidebarView(props) {
  return (
    <li className="nav-item mb-1">
      <a className={`m-primary nav-link${props.item.id == props.selected ? ' active' : ''}`} data-toggle="pill"
        onClick={() => props.select({ content_type: 'View', props: { id: props.item.id, selectContent: props.select } })} role="tab">
        {props.item.title}
      </a>
    </li>
  )
}
function Sidebar({ sessionId, title, selectContent, selected, }) {
  // const [selected, setSelected] = useState('view 1')

  //api/sidebar/
  const data = {
    Members: { view: true, edit: true },
    CreateTable: true,
    tables: [
      { id: 1, title: 'Table 1' , view: true, edit: true},
      { id: 2, title: 'Table 2' , view: true, edit: true},
      { id: 3, title: 'Table 3' , view: true, edit: true},
    ]
  };

  return (
    <>
      <div className='col-sm-2 p-3 sb'>
        <div className='title mb-3 mt-2' onClick={() => selectContent({ content_type: 'Welcome', props: {} })}>
          {title}
        </div>

        <ul className="nav flex-column nav-pills " id="pills-tab" role="tablist">
          {
            data.Members.view &&
            <SidebarItem title='Members' condition={selected.content_type == 'Members'}
              select={selectContent} newContent={{ content_type: 'Members', props: {} }} />
          }


          <hr style={{ border: '1px solid #fefefe90', width: '100%' }}></hr>
          {data.tables.map((listItem) => {
            return <SidebarView key={listItem.title} item={listItem} selected={selected.props.id === undefined ? -1 : selected.props.id} select={selectContent} />
            // return <SidebarItem key={listItem.title} item={listItem} selected = {props.selected.props.id === undefined? -1 : props.selected.props.id} select={props.selectContent}/>
          })}
          {
            data.CreateTable && <Create select={selectContent} />
          }
        </ul>
      </div>

    </>
  )

}
export default Sidebar 