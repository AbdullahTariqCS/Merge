import { useState, react, useEffect } from 'react'
import './table_create.css'
import '../../assets/theme.css'
import Select from '../../components/selectOption/selectOption'

function Attribs({ attrib, setAttrib }) {
  const type = [
    'text', 'number', 'multi-value-number', 'multi-value-text', 'multi-select-text', 'multi-select-number', 'single-select-text', 'single-select-number'
  ]

  const [select, setSelect] = useState(false);
  const [selectPos, setSelectPos] = useState({ x: 0, y: 0 });

  const onSelect = (e) => {
    const rect = e.target.getBoundingClientRect();
    setSelectPos({ x: rect.x, y: rect.y + 50});
    setSelect(true);
  }

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!e.target.closest('.table-create-select-sm') && !e.target.closest('.select')) {
        setSelect(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [])

  return (
    <>
      <div className='row' style={{ marginBottom: '0.75rem' }}>
        <div style={{ width: '2rem' }}></div>
        <div className='col-sm-4 p-0'>
          <input type="text" autoComplete='off' className="table-create-input table-create-input-sm"
            placeholder='Name' defaultValue={attrib.value} onBlur={(e) => setAttrib('value', e.target.value)}></input>
        </div>
        <div className='col-sm-4 p-0'>
          <div className={`table-create-select-sm ${attrib.type === '' ? 'm-secondary' : 'm-primary'}`} onClick={e => onSelect(e)}>
            {attrib.type === '' ? 'Type' : attrib.type}
          </div>
          {
            select && <Select position={selectPos} list={type} onSelectValue={(val) => setAttrib('type', val)}/>
          }
        </div>
      </div>
    </>
  )

}
function Relations({ relation, index, changeTwoWay }) {

  return (
    <>
      <div className='row' style={{ marginBottom: '0.75rem' }}>

        <div style={{ width: '2rem' }}></div>
        <div className='col-m-2 pl-0'>
          <input type="text" autoComplete='off' className="table-create-input-sm" placeholder='Name' defaultValue={relation.table}></input>
        </div>

        <div className='col-m-2 p-0'>
          <input type="text" autoComplete='off' className="table-create-input-sm" placeholder='Table' defaultValue={relation.name} ></input>
        </div>

        <div className='col-m-2 p-0'>
          <input type="text" autoComplete='off' className="table-create-input-sm" placeholder='on' defaultValue={relation.attrib} ></input>
        </div>

        <div className='col-m-2 p-0'>
          <input type="text" autoComplete='off' disabled={relation.currentAttrib == null ? 'on' : ''} className="table-create-input-sm" placeholder='ref. attribute' defaultValue={relation.attrib} ></input>
        </div>

        <div className='p-0 center-vertically'>
          <label className='m-primary table-checkbox-container'>
            <input type="checkbox" defaultChecked={relation.currentAttrib != null} onChange={(e) => changeTwoWay(e, index)} />
            <span className='table-checkbox-checkmark'></span>
            {/* <div className='info-box'>Two way relation</div> */}

          </label>
        </div>

      </div>

      {
        // relation.currentAttrib ===  ? <></> :
        true ? <></> :
          <div className='row mb-3'>
            <div style={{ width: '3rem' }}></div>
            <div className='col-sm-6 p-0'></div>
            <div className='col-sm-3 p-0'>
              <input type="text" autoComplete='off' className="table-create-input-sm" placeholder='on' defaultValue={relation.currentAttrib} ></input>
            </div>
          </div>
      }
    </>
  )
}
function TableCreate() {

  const [name, setName] = useState('');
  const [attribs, setAttribs] = useState([
    { value: '', type: '' },
    { value: '', type: '' },
    { value: '', type: '' },
  ]);

  const [relations, setRelations] = useState([
    { table: '', name: '', attrib: '', attrib_id: null, currentAttrib: null },
    { table: '', name: '', attrib: '', attrib_id: null, currentAttrib: '' },
    { table: '', name: '', attrib: '', attrib_id: null, currentAttrib: null },
  ]);

  const addAttrib = () => {
    setAttribs([...attribs, { value: '', type: '' }]);
  };

  const addRelation = () => {
    const newRow = { table: '', name: '', attrib: '', attrib_id: null, currentAttrib: null };
    setRelations([...relations, newRow]);
  };

  const changeTwoWay = (e, index) => {
    var tempRelations = [...relations];
    tempRelations[index].currentAttrib = e.target.checked ? '' : null;
    // console.log(tempRelations);
    setRelations(tempRelations);
  }
  return (
    <div className='table-create-wrapper'>
      <div className='container-fluid mt-5 pl-4'>
        <form className='mb-5'>
          <div className='row'>
            <label forHtml='TableName' className='m-primary table-create-label col-sm-2 mb-1'>Table Name</label>
            <div className='col-sm-10'>
              <input type="text" autoComplete='off' className="col-sm-6 table-create-input" defaultValue={name} id="TableName" onBlur={(e) => setName(e.target.value)}></input>
            </div>
          </div>
        </form>

        <p className='m-primary table-create-label' >Attributes</p>

        <form className='mb-3'>
          {
            attribs.map((attrib, idx) => {
              const setAttrib = (target, val) => {
                var newAttribs = [...attribs];
                newAttribs[idx][target] = val;
                setAttribs(newAttribs);
                console.log(attribs);
              }
              return (<Attribs attrib={attrib} setAttrib={setAttrib} />);
            })
          }

        </form>
        <p className='table-create col-sm-1 ml-3 mb-5' onClick={() => addAttrib()}>+Add</p>

        <p className='m-primary table-create-label mb-3' >Relations</p>
        <form className=''>
          {
            relations.map((relation, index) => (<Relations relation={relation} index={index} setRelations={setRelations} changeTwoWay={changeTwoWay} />))
          }

          <p className='table-create col-sm-1 ml-3' onClick={() => addRelation()}>+Add</p>
        </form>
      </div>
    </div>
  )


}

export default TableCreate;