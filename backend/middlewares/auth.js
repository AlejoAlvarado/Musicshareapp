const services = require("../services/index");

function isAuth(req, res, next) {
  if (!req.headers.authorization) {
    return res.status(403).send({ message: "No esta autorizado" });
  }
  const token = req.headers.authorization.split(" ")[1];

  services
    .decodeToken(token)
    .then((response) => {
      req.user = response;
      next();
    })
    .catch((response) => {
      console.log("error happened");
      console.log(response.status);
      res.status(response.status).send({ message: "ocurrio un error" });
    });
}

module.exports = isAuth;
