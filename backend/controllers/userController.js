const knex = require('knex');
const knexConfig = require('../knexConfig');
const Knex = knex(knexConfig);

const authenticate = async (req, res) => {
  const { info } = req.body;
  console.log('auth for ', info);
  const error = { userName: false, password: false };

  const users = await Knex.raw('Select * from users where username = ? ', [info.userName]);


  console.log(users.rows);

  if (users.rows.length === 0) {
    error.userName = true;
    res.json(error);
    return;
  }

  if (users.rows[0].pass != info.password) {
    error.password = true;
    res.json(error);
    return;
  }
  res.json(error);
};

const register = async (req, res) => {

  const { info } = req.body;
  const error = {userName : false, password: false};  
  console.log('signup for ', info);

  if (info.password.trim() != info.confirmPassword )
  {
    error.password = true; 
    res.json(error);        
    return;
  }

  const query = await Knex.raw('Select * from users where username = :username', {username: info.userName}); 
  if(query.rows.length != 0){
    error.userName = true; 
    res.json(error); 
    return; 
  }
  
  await Knex.raw('Insert into users (username, pass) values (:username, :pass)', {
    username: info.userName, 
    pass: info.password,   
  }) 
  res.json(error);
}

module.exports = {
  authenticate,
  register
};
