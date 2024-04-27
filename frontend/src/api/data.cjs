const fs = require('fs')

const data = {
  users: [
    {
      id: 1,
      view: { fixed: ['Members', 'CreateTable'], views: [1, 2, 3] },
      edit: { fixed: ['Members', 'CreateTable'], views: [1, 2, 3] }
    },
    {
      id: 1,
      view: { fixed: ['Members'], views: [2, 3] },
      edit: { fixed: ['Members'], views: [2, 3] }
    },
    {
      id: 1,
      view: { fixed: ['CreateTable'], views: [3] },
      edit: { fixed: ['CreateTable'], views: [3] }
    },
  ],
  views: [
    {
      id: 1,
      title: 'For Volunteers',
      layouts: [1, 2]
    },
    {
      id: 2,
      title: 'For Members',
      layouts: [1, 2]
    },
    {
      id: 3,
      title: 'For Volunteers',
      layouts: [1, 2]
    },
  ],

  roles: [
    {
      sessionId: 1,
      roleId: 1,
      roleTitle: 'Admin',
      members: { view: true, edit: true },
      createTable: true,
      views: { view: [1], edit: [1] },
      tables: { view: [1], edit: [1] },
    }
  ],

  tables: [
    { id: 1, sessionId: 1, title: 'Participants' }
  ],

  attributes: [
    { id: 1, tableId: 1, title: 'id', type: 'number' },
    { id: 2, tableId: 1, title: 'name', type: 'multi-select', values: ['jane', 'doe'] }
  ],

  tuples: [
    {
      id: 1, 
      data: [
        {attribId: 1, value: '1'}, 
        {attribId: 2, value: 'jane'}, 
      ]
    }, 
    {
      id: 2, 
      data: [
        {attribId: 1, value: '2'}, 
        {attribId: 2, value: 'doe'}, 
      ]
    }
  ],

  relations: [
    { id: 1, fromTable: 1, toTable: 1, name: 'hostel id', onAttrib: 1, rtName: 'Participands id', rtOnAttrib: 1 },
  ],

  relationData: [
    {id: 1, rId: 1, tTupleId: 1, rTupleId: 1}, 
    {id: 1, rId: 1, tTupleId: 1, rTupleId: 2}, 
  ], 
  layouts: [
    {
      id: 1,
      title: 'Participants',
      tableId: 1,
      sortBy: 1, 
      attribs: [
        { id: 1, position: 1 },
        { id: 2, position: 2 },
        { id: 3, position: 3 }
      ],
      referenceAttribs: [
        { rId: 1, position: 4, method: 'view' },
      ]
    },
    {
      id: 2,
      title: 'Hostel',
      tableId: 1,
      attribs: [
        { id: 4, position: 1 },
        { id: 5, position: 1 },
      ],
      referenceAttribs: [
        { rId: 1, position: 3, method: 'sum' },
      ]
    },
  ]
}

fs.writeFileSync('data.json', JSON.stringify(data));