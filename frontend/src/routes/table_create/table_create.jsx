import { useState, react } from 'react'
import './table_create.css'
import '../../assets/theme.css'

function Attribs(props) {
  return (
    <>
      <div className='row' style={{marginBottom: '0.75rem'}}>
        <div style={{width: '2rem'}}></div> 
        <div className='col-sm-4 p-0'>
          <input type="text" autoComplete='off' className="table-create-input table-create-input-sm" placeholder='Name' defaultValue={props.attrib.value}></input>
        </div>
        <div className='col-sm-4 p-0'>
          <input type="text" autoComplete='off' className="table-create-input table-create-input-sm" placeholder='Type' defaultValue={props.attrib.type} ></input>
        </div>
      </div>
      {/* <tr>
        <td>
          <input type="text" autoComplete='off' className="table-create-input table-create-input-sm" placeholder='Name' defaultValue={props.attrib.value}></input>
        </td>
        <td>
          <input type="text" autoComplete='off' className="table-create-input table-create-input-sm" placeholder='Type' defaultValue={props.attrib.type} ></input>
        </td>
      </tr> */}
    </>
  )

}
function Relations({ relation, index, changeTwoWay }) {

  return (
    <>
      <div className='row' style={{marginBottom: '0.75rem'}}>

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
      {/* <div className='m-heading'>Create table</div> */}
      <div className='container-fluid mt-5 pl-4'>
        <form className='mb-5'>
          <div className='row'>
            <label forHtml='TableName' className='m-primary table-create-label col-sm-2 mb-1'>Table Name</label>
            <div className='col-sm-10'>
              <input type="text" autoComplete='off' className="col-sm-6 table-create-input" id="TableName" ></input>
            </div>
          </div>
        </form>
        {/* <Attribs attribs={attribs} addAttrib={addAttrib} /> */}

        <p className='m-primary table-create-label' >Attributes</p>

        {/* <table className='table table-bordered col-sm-8 m-primary'>
          <thead>
            <tr>
              <th scope="col" className='pl-4'>Name</th>
              <th scope="col">Type</th>
            </tr>
          </thead> */}
        {/* <tbody> */}
        <form className='mb-3'>
          {
            attribs.map((attrib) => {
              return (<Attribs attrib={attrib} />);
            })
          }

        </form>
        {/* </tbody> */}
        <p className='table-create col-sm-1 ml-3 mb-5' onClick={() => addAttrib()}>+Add</p>
        {/* </table> */}

        <p className='m-primary table-create-label mb-3' >Relations</p>
        <form className=''>
          {
            relations.map((relation, index) => (<Relations relation={relation} index={index} changeTwoWay={changeTwoWay} />))
          }

          <p className='table-create col-sm-1 ml-3' onClick={() => addRelation()}>+Add</p>
        </form>
      </div>
    </div>
  )


}

export default TableCreate;