const services = require("../services/index");

function isAuth(req, res, next) {
  if (!req.headers.authorization) {
    return res.status(403).send({ message: "Not authorized" });
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
      res.status(response.status).send({ message: "An error happened" });
    });
}

function authRole(role) {
  return (req, res, next) => {
    if (req.body.role !== role && req.body.role !== "SUPERADMIN") {
      return res.status(401).send({ message: "User not authorized" });
    }
    next();
  };
}

module.exports = {
  isAuth,
  authRole,
};
