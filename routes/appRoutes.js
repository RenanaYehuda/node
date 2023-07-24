const readRouter = require("./read");
const indexRouter = require("./index");

exports.routesInit = (app) => {
  app.use("/", indexRouter);
  app.use("/read", readRouter);
};
