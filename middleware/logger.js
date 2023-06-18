const logger = (req, res, next) => {
  const today = new Date();
  console.log("=============================================");
  console.log(today.toString());
  console.log(req.path);
  console.log(req.method);
  console.log("=============================================");
  next();
};

module.exports = logger;
