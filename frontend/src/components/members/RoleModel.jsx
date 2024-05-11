import { React, useEffect, useState } from 'react'
import Select from '../selectOption/selectOption';
import './Members.css'
import '../../assets/theme.css'

function RoleModel({ open, setOpen, canEdit, sessionId, roleId, color }) {

  //api/roles/:role_id/permission
  const [role, setRole] = useState({
    color: 'green',
    members: { view: true, edit: true },
    createTable: true,
    tables: { view: [1, 2], edit: [1, 2] },
  }
  );

  //api/table/:session_id
  const tables = [
    { id: 1, name: 'Table 1' },
    { id: 2, name: 'Table 2' },
    { id: 3, name: 'Table 3' },
  ];

  const onUpdate = () => {
    //api/role/update/:role_id
    setOpen(false);
  }
  const colors = ['green', 'cyan', 'red', 'orange'];

  const [colorPos, setColorPos] = useState({ x: 0, y: 0 });
  const [colorSelect, setColorSelect] = useState(false);

  const [viewSelect, setViewSelect] = useState(false);
  const [editSelect, setEditSelect] = useState(false);

  const [viewSelectedItems, setViewSelectedItems] = useState([]);
  const [editSelectedItems, setEditSelectedItems] = useState([]);

  const onColorClick = (e) => {
    const rect = e.target.getBoundingClientRect();
    setColorPos({ x: rect.x - 298, y: rect.y - 30 });
    setColorSelect(true);
  }

  const onOtherSelect = (input) => {
    if (!canEdit)
      return;
    if (input === 'member_view') {
      if (role.members.view)
        setRole({ ...role, members: { view: !role.members.view, edit: false } });
      else
        setRole({ ...role, members: { ...role.members, view: !role.members.view } });

    }

    else if (input === 'member_edit' && role.members.view)
      setRole({ ...role, members: { ...role.members, edit: !role.members.edit } });
    else if (input === 'create_table')
      setRole({ ...role, createTable: !role.createTable });
  }

  const handleItemClick = (id, ctrlKey, shiftKey, selectedItems, setSelectedItems) => {
    let newSelectedItems;
    if (ctrlKey) {
      if (selectedItems.includes(id)) {
        newSelectedItems = selectedItems.filter(itemId => itemId !== id);
      } else {
        newSelectedItems = [...selectedItems, id];
      }
    }
    else if (shiftKey) {
      const min = Math.min(...selectedItems);
      newSelectedItems = id <= Math.min(...selectedItems) ?
        Array(min - id + 1).fill().map((_, index) => index + id) :
        Array(id - min + 1).fill().map((_, index) => index + min)
    }
    else {
      newSelectedItems = [id];
    }

    setSelectedItems(newSelectedItems);
  };

  const onViewSelect = (val) => {
    const tableId = tables.find(table => table.name === val).id;
    if (!role.tables.view.includes(tableId))
      setRole({ ...role, tables: { ...role.tables, view: [...role.tables.view, tableId] } });
  }
  const onEditSelect = (val) => {
    const tableId = tables.find(table => table.name === val).id;
    if (!role.tables.edit.includes(tableId))
      setRole({ ...role, tables: { ...role.tables, edit: [...role.tables.edit, tableId] } });
  }

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!e.target.closest('.role-box') && !e.target.closest('.select')) {
        setViewSelectedItems([]);
        setEditSelectedItems([]);
        setViewSelect(false);
        setEditSelect(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [])

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!e.target.closest('.select'))
        setColorSelect(false);
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [])


  if (open)

    return (
      <>
        <div className='role-model'>
          <div className='container-fluid row d-flex align-items-center mb-4'>
            <div className='m-primary role-heading col-sm-3' >Color</div>
            <div className='m-primary role-model-input col-sm-4' onClick={(e) => onColorClick(e)}>{role.color}</div>
            {colorSelect && canEdit && <Select clear={false} position={colorPos} list={colors} onSelectValue={(val) => setRole({ ...role, color: val })} />}
          </div>

          <div className='container-fluid row d-flex align-items-center mb-4'>
            <div className='m-primary role-heading col-sm-3'>Other</div>

            <div className={`role-button ${!role.members.view ? '' : 'selected'}`}
              onClick={() => onOtherSelect('member_view')}>View Members</div>

            <div className={`role-button ${!role.members.edit ? '' : 'selected'}`}
              onClick={() => onOtherSelect('member_edit')}>Edit Members</div>

            <div className={`role-button ${!role.createTable ? '' : 'selected'}`}
              onClick={() => onOtherSelect('create_table')}>Create Table</div>
          </div>

          <div className='container-fluid row mt-5 mb-5'>
            <div className='col'>
              <div className='m-primary role-heading  ml-3 mb-2' style={{ fontWeight: '500', fontSize: '17px' }}>View Table</div>
              <div className='role-box col-sm-12 '>
                {
                  role.tables.view.map((tableId, idx) => {
                    const name = tables.find(table => table.id === tableId).name;
                    return (
                      <div className={`box-item ${viewSelectedItems.includes(idx) ? 'm-primary' : 'm-secondary'}`}
                        onClick={(e) => handleItemClick(idx, e.ctrlKey, e.shiftKey, viewSelectedItems, setViewSelectedItems)}>{name}</div>
                    )
                  })
                }
              </div>
              {
                canEdit &&
                (viewSelect ? <Select clear={false} list={tables.map(table => table.name)}
                  onSelectValue={(val) => onViewSelect(val)} /> :
                  <p className='add-member mt-2' style={{ marginBottom: '0' }} onClick={() => setViewSelect(true)} >+Add</p>)
              }

            </div>

            <div className='col'>
              <div className='m-primary role-heading  ml-3 mb-2' style={{ fontWeight: '500', fontSize: '17px' }}>Edit Table</div>
              <div className='role-box col-sm-12 '>
                {
                  role.tables.edit.map((tableId, idx) => {
                    const name = tables.find(table => table.id === tableId).name;
                    return (
                      <div className={`box-item ${editSelectedItems.includes(idx) ? 'm-primary' : 'm-secondary'}`}
                        onClick={(e) => handleItemClick(idx, e.ctrlKey, e.shiftKey, editSelectedItems, setEditSelectedItems)}>{name}</div>
                    )
                  })
                }
              </div>
              {
                canEdit &&
                (editSelect ? <Select clear={false} list={tables.filter(table => role.tables.view.includes(table.id)).map(table => table.name)}
                  onSelectValue={(val) => onEditSelect(val)} /> :
                  <p className='add-member mt-2' style={{ marginBottom: '0' }} onClick={() => setEditSelect(true)} >+Add</p>)
              }

            </div>
          </div>
          {
            canEdit &&
            <div className='m-button role-update' onClick={() => onUpdate()}>Update</div>
          }

        </div>
        <div className='role-model-background'></div>
      </>
    )

  return (<></>)
}
export default RoleModel;