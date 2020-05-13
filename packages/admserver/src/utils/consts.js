let consts;

function config(obj) {
  if (!consts && obj) {
    consts = obj;
  }
  return consts;
}

module.exports = config;
