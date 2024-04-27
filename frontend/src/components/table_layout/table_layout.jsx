import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types'
import Select from '../selectOption/selectOption';
import './table_layout.css'
import '../../assets/theme.css'

function Layout(props) {
  //  /api/layout/:layout_id
  const layoutData = {
    name: `Layout ${props.id}`,
    headers: [
      { id: 0, value: 'id', type: 'number', position: 0, permission: false },
      { id: 1, value: 'first', type: 'multi-select', position: 1, options: ['Mark', 'Otto', 'hello'], permission: true },
      { id: 2, value: 'last', type: 'text', position: 2, permission: true },
      { id: 3, value: 'handle', type: 'text', position: 3, permission: true },
      { id: 4, value: 'email', type: 'text', position: 4, permission: true },
    ],
    data: [
      [
        { id: 0, value: '1', attrib_id: 0 },
        { id: 1, value: ['Mark'], attrib_id: 1 },
        { id: 2, value: 'Otto', attrib_id: 2 },
        { id: 3, value: '@mdo', attrib_id: 3 },
        { id: 3, value: '@mdo', attrib_id: 4 },
      ],
      [
        { id: 0, value: '6', attrib_id: 0 },
        { id: 1, value: 'Mark', attrib_id: 1 },
        { id: 2, value: 'Otto', attrib_id: 2 },
        { id: 3, value: '@mdo', attrib_id: 3 },
        { id: 3, value: '@mdo', attrib_id: 4 },
      ],
      [
        { id: 0, value: '9', attrib_id: 0 },
        { id: 1, value: 'mark', attrib_id: 1 },
        { id: 2, value: 'otto', attrib_id: 2 },
        { id: 3, value: '@mdo', attrib_id: 3 },
        { id: 3, value: '@mdo', attrib_id: 4 },
      ],
    ]
  }

  const [tupleData, setTupleData] = useState(layoutData.data)
  const onTupleCreate = () => {
    //api/layout/:layout_id/addTuple/:layout_id 
    //inserts data in data relation, referencing table relation and attribute relation, retriving attribute id and data id
    //retrieves positions from layout relation through attribute id and layout id
    //retrivees edit permission from 
    const new_row = [
      { id: 0, value: '', attrib_id: 0 },
      { id: 1, value: '', attrib_id: 1 },
      { id: 2, value: '', attrib_id: 2 },
      { id: 3, value: '', attrib_id: 3 },
      { id: 3, value: '', attrib_id: 4 },
    ]
    setTupleData([...tupleData, new_row]);
  }

  const onImport = () => {
    console.log('on import'); 
    props.selectContent({content_type: 'Import', props: {setContentType: props.selectContent, type: 'Layout', id: 1}})
  }

  const style = layoutData.headers.length > 4 ? { width: `${layoutData.headers.length * 25}%`, overflowX: true } : { width: '100%' };

  return (
    <>
      <div className='container-fluid'>
        <div className='row d-flex align-items-center '>
          <h3 className='col-sm-10 table-name'>{layoutData.name}</h3>
          <div className='col-sm-1 button ml-5  'style={{height: '37px'}}>
            <div className='m-button' onClick={() => onImport()} >
             Import
            </div>    
          </div>
        </div>


      </div>
      <div className='table-responsive table-wrapper'>
        <table className="table  table-dark white-border" style={style}>
          <Head data={layoutData.headers} />
          <tbody>
            {
              tupleData.map((tuple) => {
                return <Tuple data={tuple} attribs={layoutData.headers} />
              })
            }
            <tr className='create-tuple' onClick={() => onTupleCreate()}><td colSpan={layoutData.headers.length}>
              + Create
            </td></tr>
          </tbody>
        </table>
      </div>
    </>
  )
}

function Tuple(props) {

  const cellWidth = 100 / props.attribs.length;
  const style = (props.data.every(data => data.value.trim().length === 0) ? { height: '50px' } : {})

  // console.log(cellWidth);
  return (
    <>
      {
        <tr className='container-fluid' style={style}>
          {
            props.data.sort((a, b) => {
              // console.log(a, b)
              const header_a = props.attribs.find(header => header.id === a.attrib_id);
              const header_b = props.attribs.find(header => header.id === b.attrib_id);
              return header_a.position - header_b.position;
            }).map((data) => {
              const header = props.attribs.find(header => header.id === data.attrib_id)
              const options = header.options === undefined ? [] : header.options
              return <Cell key={data.id} id={data.id} value={data.value} options={options} permission={header.permission} type={header.type} cellWidth={cellWidth} />
            })
          }
        </tr>
      }
    </>
  )
}

function Head(props) {
  // const cellWidth = { width: (props.data.length >= 4 ? '25%' : `${100 * (1 / props.length)}%`) };

  return (
    <thead>
      <tr>
        {
          props.data.map((data) => {
            return (<th className='w-20' scope="col" style={{ width: `${100 / props.data.length}%` }}>{data.value}</th>)
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

}

Cell.defaultValue = {
  selected: false,
  errors: []
}

function Cell(props) {
  const [value, setValue] = useState(props.value);
  const [clicked, setClicked] = useState(props.selected);
  const [errors, setErrors] = useState(props.errors);
  const [selectPos, setSelectPos] = useState({ x: 0, y: 0 });
  const cellRef = useRef(null);

  const onSubmit = (newValue) => {
    //middleware to check input
    //if errors rerender the cell with an error list

    //api/data/:data_id/val=new_value
    console.log(`${props.id} changed to ${newValue}`)
    if ((props.type == 'multi-select' || props.type == 'multi-value') && Array.isArray(value))
      setValue([...value, newValue]);
    else
      setValue(newValue)
    setClicked(false);
  };

  const onClick = (e) => {
    if (!clicked && props.permission) {
      setClicked(true);
      if (props.type.includes('multi')) {

        const rect = e.target.getBoundingClientRect();
        setSelectPos({ x: rect.x - 20, y: rect.y + 50 });
      }
    }
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

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!e.target.closest('.cell')) {
        setClicked(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);


  // const value = props.type === 'multi-value' || props.type === 'multi-select' ? 

  if (clicked && (props.type === 'select' || props.type === 'multi-select'))
    return (
      <td className='cell' style={{ width: `${props.cellWidth}%` }} ref={cellRef}>
        {Array.isArray(value) ? (<ul className='mb-2 pl-0'>{value.map((currentval) => <li className=''>{currentval}</li>)}</ul>) : <div className='mb-2'>{value}</div>}
        <Select list={props.options} position={selectPos} onSelectValue={onSubmit} />

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
            {Array.isArray(value) ? (<ul className='mb-1 pl-0'>{value.map((currentval) => <li className=''>{currentval}</li>)}</ul>) : <></>}
            <input type='text' id='box' className='form-control table-input' defaultValue={value} autoFocus />
          </div>
        </form>
      </td>
    );

  return (
    // <td className='' style={{ width: `${props.cellWidth}%` }} onClick={onClick}>{value}</td>

    <td className='cell' style={{ width: `${props.cellWidth}%`, cursor: 'pointer' }} ref={cellRef} onClick={(e) => onClick(e)}>
      {Array.isArray(value) ?
        (<div className='cell-multi-view'><ul className='mb-1 pl-0' style={{ listStyle: 'disc' }}>{value.map((currentval) => <li className=''>{currentval}</li>)}</ul></div>)
        : <div className='mb-2'>{value}</div>
      }
    </td>
  );
}

export default Layout 