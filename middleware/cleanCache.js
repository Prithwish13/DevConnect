const { clearHash } = require("../helper/cache");

module.exports = async (req, res, next) => {
  //let the route handler every thing thats need to do
  await next();
  clearHash(req.user.id);
};
