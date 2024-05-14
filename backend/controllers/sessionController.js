const index = async(req, res) => {
    const session_id = req.query.session_id;
    console.log(`session index: ${session_id}`);
    res.send(`session index: ${session_id}`);
};

const sidebar = async (req, res) => {
  const data = {
    Members: { view: true, edit: true },
    CreateTable: true,
    tables: [
      { id: 1, title: 'Table 1', view: true, edit: true },
      { id: 2, title: 'Table 2', view: true, edit: true },
      { id: 3, title: 'Table 3', view: true, edit: true },
    ]
  };

  res.json(data); 
};

module.exports = {
    index, 
    sidebar

};
