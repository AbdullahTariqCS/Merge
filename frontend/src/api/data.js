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

  tables:[
    
  ], 
    
  relations: [
    { id: 1, fromTable: 1, toTable: 1, name: 'hostel id', onAttrib: 1, rtName: 'Participands id', rtOnAttrib: 1 },
  ],

  layouts: [
    {
      id: 1,
      title: 'Participants',
      tableId: 1,
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