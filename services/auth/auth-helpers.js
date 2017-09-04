const bcrypt = require('bcryptjs');

function comparePass(userPassword, databasePassword) {
  return bcrypt.compareSync(userPassword, databasePassword);
}

//this is not working properly. seems to be sending to the index. But why why?
function loginRedirect(req, res) {
  if (req.user) return res.redirect('/user/profile');
}

function loginRequired(req, res, next) {
  if (!req.user) return res.redirect('/auth/login');
  return next();
}

module.exports = {
  comparePass,
  loginRedirect,
  loginRequired,
}
