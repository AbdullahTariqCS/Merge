import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types'
import Select from '../selectOption/selectOption';
import Headers from './header'
import './table_layout.css'
import '../../assets/theme.css'

function Table(props) {
  //  /api/layout/:layout_id
  const [tableData, setTableData] = useState(
    {
      name: ` `,
      editPermission: true,
      configuration: {
        filter: { attrib: '', val: '' },
        sort: { attrib: '', asc: true },
        expanded: false,
      },
      attribs: [
        { id: 0, name: 'Id', type: 'number', position: 0 },
        { id: 1, name: 'Name', type: 'text', position: 1 },
        { id: 2, name: 'Numbers', type: 'multi-value-number', position: 2 },
        { id: 3, name: 'Hostels', type: 'multi-select-text', position: 3, options: ['Hostel 1', 'Hostel 2', 'Hostel 3'] },
        { id: 4, name: 'Email Type', type: 'single-select-text', position: 4, options: ['Official Mail', 'Personal Mail'] },
      ],
      data: [
        {
          tupleId: 0,
          vals: [
            { attrib_id: 0, value: '1' },
            { attrib_id: 1, value: 'Boii' },
            { attrib_id: 2, value: ['123'] },
            { attrib_id: 3, value: ['Hostel 1'] },
            { attrib_id: 4, value: 'Personal Mail' },
          ]
        },
      ]
    });

  const [configuration, setConfiguration] = useState(tableData.configuration);
  const onTupleCreate = () => {
    //api/table/:table_id/addTuple/:t_id
    //inserts data in data relation, referencing table relation and attribute relation, retriving attribute id and data id
    //retrieves positions from layout relation through attribute id and layout id
    //retrivees edit permission from 

    //api/table/:table_id/tuple/:t_id
    const newTuple = {
      tupleId: 0,
      vals: [
        { attrib_id: 0, value: '' },
        { attrib_id: 1, value: '' },
        { attrib_id: 2, value: [] },
        { attrib_id: 3, value: [] },
        { attrib_id: 3, value: '' },
      ]
    };
    setTableData({ ...tableData, data: [...tableData.data, newTuple] });
  }


  const style = tableData.attribs.length > 4 ? { width: `${tableData.attribs.length * 25}%`, overflowX: true } : { width: '100%' };

  return (
    <>
      {/* <div className='container-fluid'>
        <div className='row d-flex align-items-center '>
          <h3 className='col-sm-10 table-name'>{tableData.name}</h3>
          <div className='col-sm-1 button ml-5  ' style={{ height: '37px' }}>
            <div className='m-button' onClick={() => onImport()} >
              Import
            </div>
          </div>
        </div>


      </div> */}
      <Headers selectContent={props.selectContent} data={tableData} configuration={configuration} setConfiguration={setConfiguration} />
      <div className='table-responsive table-wrapper '>
        <table className="table  table-dark white-border" style={style}>
          <Head attribs={tableData.attribs} configuration={configuration} setConfiguration={setConfiguration} />
          <tbody className='body-wrapper'>
            {
              tableData.data.map((tuple) => {
                return <Tuple data={tuple.vals} id={tuple.id} attribs={tableData.attribs} permission={tableData.editPermission} expanded={configuration.expanded} />
              })
            }
            <tr className='create-tuple' onClick={() => onTupleCreate()}><td colSpan={tableData.attribs.length}>
              + Create
            </td></tr>
          </tbody>
        </table>
      </div>
    </>
  )
}

function Tuple({ data, attribs, id, permission, expanded }) {

  const cellWidth = 100 / attribs.length;
  const style = (data.every(current_data => (Array.isArray(current_data.value) && current_data.value.length === 0) || current_data.value.trim().length === 0) ? { height: '50px' } : {})

  // console.log(cellWidth);
  return (
    <>
      {
        <tr className='container-fluid' style={style}>
          {
            data.sort((a, b) => {
              // console.log(a, b)
              const attrib_a = attribs.find(attrib => attrib.id === a.attrib_id);
              const attrib_b = attribs.find(attrib => attrib.id === b.attrib_id);
              return attrib_a.position - attrib_b.position;
            }).map((data) => {
              const attrib = attribs.find(attrib => attrib.id === data.attrib_id)
              const options = attrib.options === undefined ? [] : attrib.options
              return <Cell key={data.id} tupleId={id} attrib_id={data.attrib_id} value={data.value}
                options={options} permission={permission} type={attrib.type} cellWidth={cellWidth} expanded={expanded} />
            })
          }
        </tr>
      }
    </>
  )
}

function Head({ attribs, configuration, setConfiguration }) {
  // const cellWidth = { width: (props.data.length >= 4 ? '25%' : `${100 * (1 / props.length)}%`) };

  const onClick = (attrib) => {
    if (configuration.sort.attrib === attrib && configuration.sort.asc === true)
      setConfiguration({ ...configuration, sort: { attrib: attrib, asc: !configuration.sort.asc } });
    else if (configuration.sort.attrib === attrib && configuration.sort.asc === false)
      setConfiguration({ ...configuration, sort: { attrib: '', asc: !configuration.sort.asc } });
    else
      setConfiguration({ ...configuration, sort: { attrib: attrib, asc: true } });
    console.log(configuration);
  }

  return (
    <thead className='head-wrapper'>
      <tr>
        {
          attribs.map((attrib) => {
            const icon = attrib.type.includes('number') ? '#' : 'T';
            const style = { fontSize: '16px', fontFamily: '', opacity: '50%' };

            return (
              <th className='w-20 pl-0' scope="col" style={{ width: `${100 / attribs.length}%`, cursor: 'pointer' }}
                onClick={() => onClick(attrib.name)}>

                <div className='container-fluid row d-flex align-items-center pr-0'>
                  <p className='m-0 mr-2 m-secondary' style={style}>{icon}</p>
                  <p className='m-0 p-0'>{attrib.name}</p>
                  {
                    configuration.sort.attrib === attrib.name &&
                    <i className={`fas fa-chevron-${configuration.sort.asc ? 'down' : 'up'} p-0 m-0 m-secondary col justify-content-end`} style={{ fontSize: '12px', opacity: '50%' }}></i>
                  }
                </div>
              </th>)
          })
        }
      </tr>
    </thead>
  )
}

Cell.propTypes = {
  id: PropTypes.number,
  value: PropTypes.string,
  permission: PropTypes.bool,
  cellWidth: PropTypes.number,
  type: PropTypes.string,
  options: PropTypes.array,
  selected: PropTypes.bool,
  errors: PropTypes.array,
  expanded: PropTypes.bool

}

Cell.defaultValue = {
  selected: false,
  errors: []
}

function Cell(props) {
  const [value, setValue] = useState(props.value);
  const [clicked, setClicked] = useState(props.selected);
  const [errors, setErrors] = useState(props.errors);

  const [selectedItems, setSelectedItems] = useState([]);
  const [selectPos, setSelectPos] = useState({ x: 0, y: 0 });
  const cellRef = useRef(null);

  const onSubmit = (newValue) => {
    //middleware to check input
    //if errors rerender the cell with an error list

    //api/data/:tuple_id/:attrib_id/val=new_value
    console.log(`${props.id} changed to ${newValue}`)
    if (props.type.includes('multi') && Array.isArray(value))
      setValue([...value, newValue]);
    else
      setValue(newValue)
    setClicked(false);
  };

  const onClick = (e) => {
    if (!clicked && props.permission) {
      setClicked(true);
      if (props.type.includes('select')) {

        const rect = e.target.getBoundingClientRect();
        setSelectPos({ x: rect.x - 15, y: rect.y + 40 });
      }
    }
  };


  const handleSelectList = (id, ctrlKey, shiftKey) => {
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

  useEffect(() => {
    const handleKeyPress = (event) => {
      if ((event.key === 'Escape' || event.key === 'Tab') && clicked) {
        setClicked(false);
      }
    };
    document.addEventListener('keydown', handleKeyPress);
    return () => {
      document.removeEventListener('keydown', handleKeyPress);
    };
  }, [clicked]);


  // useEffect(() => {
  //   function handleClickOutside(event) {
  //     if (clicked && cellRef.current && !cellRef.current.contains(event.target)) {
  //       setClicked(false);
  //     }
  //   }
  //   document.addEventListener('click', handleClickOutside);
  //   return () => {
  //     document.removeEventListener('click', handleClickOutside);
  //   };
  // }, [cellRef, clicked]);

  useEffect(() =>{
    const handleClickOutside = (e) => {
      if (!e.target.closest('.cell')) {
        setClicked(false);
        setSelectedItems([]);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // const value = props.type === 'multi-value' || props.type === 'multi-select' ? 
  if (clicked && (props.type.includes('select')))
    return (
      <td className='cell' style={{ width: `${props.cellWidth}%` }} ref={cellRef}>
        {props.type.includes('multi') ?
          (<ul className='mb-2 ml-1 pl-0 list-unstyled'>
            {value.map((currentval, idx) => <li className={`cell-list-item ${selectedItems.includes(idx) ? 'm-primary' : 'm-secondary'}`} onClick={(e) => handleSelectList(idx, e.ctrlKey, e.shiftKey)}>{currentval}</li>)}
          </ul>)
          : <div className='mb-2 ml-1'>{value}</div>}
        <Select list={props.options} position={props.type.includes('multi') ? undefined : selectPos} onSelectValue={onSubmit} clear={!props.type.includes('multi')} />
      </td>
    )

  if (clicked)
    return (
      <td className='cell' style={{ width: `${props.cellWidth}%` }} ref={cellRef}>
        <form onSubmit={(e) => {
          e.preventDefault()
          onSubmit(e.target.elements.box.value)
        }
        }>
          <div className='form-group' >
            {
              Array.isArray(value) &&
              <ul className='mb-1 ml-1 pl-0 list-unstyled'>
                {value.map((currentval, idx) => <li className={`cell-list-item ${selectedItems.includes(idx) ? 'm-primary' : 'm-secondary'}`} onClick={(e) => handleSelectList(idx, e.ctrlKey, e.shiftKey)}>{currentval}</li>)}
              </ul>
            }
            <input type='text' id='box' className='form-control table-input' autoComplete='off' defaultValue={props.type.includes('multi') ? null : value} autoFocus />
          </div>
        </form>
      </td>
    );
  return (
    // <td className='' style={{ width: `${props.cellWidth}%` }} onClick={onClick}>{value}</td>

    <td className='cell' style={{ height: '25px', overflowX: 'auto', maxWidth: `${props.cellWidth}%`, cursor: 'pointer' }} ref={cellRef} onClick={(e) => onClick(e)}>
      {Array.isArray(value) ?
        (
          <div className={props.expanded ? 'ml-1 ' : 'cell-multi-view ml-1'}>
            <ul className='mb-1 pl-0' style={{ listStyle: 'none' }}>
              {value.map((currentval) => <li className=''>{currentval}</li>)}
            </ul>
          </div>
        )
        : <div className='cell-text mb-2 ml-1'>{value}</div>
      }
    </td>
  );
}

export default Table 