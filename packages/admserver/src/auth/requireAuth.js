module.exports = function requireAuth(req, res, next) {
  // if (req.isAuthenticated()) {
  //   next();
  // } else {
  //   res.redirect('/login');
  // }
  next();
};
