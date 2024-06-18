exports.isAdmin = (req, res, next) => {
  if (req.user.isAdmin == true) {
    return next();
  } else {
    res.status(403).send();
  }
};
