const knexConfig = require('../knexConfig');
const knex = require('knex');
const Knex = knex(knexConfig);
const {v4: uuidv4} = require('uuid')

const index = async (req, res) => {
  const { sessionId } = req.query;

  const tables = [

    { id: 1, name: 'Table 1' },
    { id: 2, name: 'Table 2' },
    { id: 3, name: 'Table 3' },
  ]

  const tableQuery = await Knex.raw('Select t_id, t_name from tables_ where session_id = ?', [sessionId]);


  res.json(tableQuery.rows.map(table => ({
    id: table.t_id,
    name: table.t_name,
  })));

}


const getData = async (req, res) => {
  const tableId = req.query.tableId;

  const tempData =
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
          { attrib_id: 1, value: 'Xyz' },
          { attrib_id: 2, value: ['123'] },
          { attrib_id: 3, value: ['Hostel 1'] },
          { attrib_id: 4, value: 'Personal Mail' },
        ]
      },
    ]
  };


  const attribsQuery = await Knex.raw("Select * from attributes_ where t_id = ?", [tableId]);
  const attribs = attribsQuery.rows.map(attrib => ({
    id: attrib.a_id,
    name: attrib.a_name,
    type: attrib.a_type,
    position: attrib.a_positions
  }))

  const attribMV = await Promise.all(attribs.map(async (attrib) => {
    if (!attrib.type.includes('select'))
      return attrib;

    const optionsQuery = await Knex.raw('Select option from options where a_id = ?', [attrib.id]);
    return { ...attrib, options: optionsQuery.rows.map(opt => opt.option) };
  }))

  
  const tuplesQuery = Knex.raw('Select * from tuples where t_id = ?', [tableId]); 
  

  console.log(attribMV);
  const data =
  {
    name: 'Table A' ,
    configuration: {
      filter: { attrib: '', val: '' },
      sort: { attrib: '', asc: true },
      expanded: false,
    },
    attribs: attribMV,  
    data: []
  };


  res.json(tempData);
};


const addTuplePost = async (req, res) => {
  
  const { attribs, tableId } = req.body;
  const newTuple = {
    tupleId: uuidv4(), //generating uuid
    vals: [],
  }

  await Knex.raw('insert into tuple (tu_id, t_id) values (?, ?)', [newTuple.tupleId, tableId]); 

  await Promise.all(attribs.sort((a, b) => a.position - b.position).map(async (attrib) => {
    if (!attrib.type.includes('multi')) {
        await Knex.raw('INSERT INTO data (tu_id, a_id) VALUES (?, ?)', [newTuple.tupleId, attrib.id]);
    }

    newTuple.vals.push({
        attrib_id: attrib.id,
        value: attrib.type.includes('multi') ? [] : ''
    });
}));

  console.log('new tuple generated', newTuple);
  res.send(newTuple);

};

const configUpdate = async (req, res) => {
  const { newConfiguration } = req.body;
  //update query to update the configuration of the table
}

const updateData = async (req, res) => {
  const { type, attribId, tupleId, value } = req.body;
  console.log('update data reqest', type, attribId, tupleId, value);

  //different cases for a) single-value b) multi-value c) relations. 
  
  res.send('ok');
};

const deleteData = async (req, res) => {
  const { attribId, tupleId, type, value } = req.body;
  console.log(attribId, tupleId, type, value);
  res.send('ok');
}


const deleteTuple = async (req, res) => {
  const { tupleId } = req.body;
  await Knex.raw('Delete from tuple where tu_id = ?', [tupleId]); 

  console.log('deleted tuple'); 
  res.send('ok');

}


const createTable = async (req, res) => {
  console.log("Create table route accessed");
  res.send("Create table route accessed");
};

const deleteTable = async (req, res) => {
  const { tableId } = req.body;
  console.log(`Delete table route accessed for table ID: ${tableId}`);
  res.sendStatus(200);
};

const updateTable = async (req, res) => {
  console.log("Update table route accessed");
  res.send("Update table route accessed");
};

module.exports = {
  index,
  configUpdate,
  getData,
  updateData,
  updateTable,
  createTable,
  deleteTable,
  addTuplePost,
  deleteData,
  deleteTuple
};
