const types = {
  avatar: (req, res) => res.send('avatar endpoint'),
  cloud: require('./cloud')
};

module.exports = (req, res) => {
  const type = req.params.type;
  if(!Object.keys(types).includes(type)){
    res.code(404).send();
    return;
  }else{
    types[type](req, res);
  }
};
