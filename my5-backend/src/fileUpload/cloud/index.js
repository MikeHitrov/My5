const types = {
  file: require('./file'),
  folder: require('./folder')
}

module.exports = (req, res) => {
  const type = req.params.subType;
  if(!Object.keys(types).includes(type)){
    res.code(404).send();
    return;
  }else{
    types[type](req, res);
  }
};
