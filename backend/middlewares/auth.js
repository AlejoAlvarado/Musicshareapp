/**
 * This class acts as a middleware for the requests made by the client in order to make the correspondent authentifications when necessary.
 */

const services = require("../services/index");

/**
 * This function authenticates that a user has a valid authentication token, which is received via the request headers.
 * In the case that the user doesn't have the authentication token or if it has expired, an error response is sent back to the client
 * @param {*} req The request sent by the user
 * @param {*} res The response to the client that will be sent
 * @param {*} next A function to continue to the next request or piece of code
 */
function isAuth(req, res, next) {
  if (!req.headers.authorization) {
    return res.status(401).send({ message: "Not authorized" });
  }
  const token = req.headers.authorization.split(" ")[1];

  services
    .decodeToken(token)
    .then((response) => {
      req.user = response.sub;
      req.role = response.role;
      next();
    })
    .catch((response) => {
      console.log("error happened");
      console.log(response.status);
      res.status(response.status).send({ message: "An error happened" });
    });
}

/**
 * This function authenticates that a user possesses one role from an array of roles that is passed as a parameter to this method.
 * In the case that the user making the request doesn't meet the criteria given, an error response will be sent back.
 * @param {*} roles The set of roles that the user's role will be compared to.
 */
function authRole(roles) {
  //const token = req.headers.authorization.split(" ")[1];
  //const payload = jwt.decode(token, config.SECRET_TOKEN);
  return (req, res, next) => {
    console.log("Role is " + req.role);
    if (!roles.includes(req.role)) {
      return res.status(401).send({ message: "User not authorized" });
    }
    next();
  };
}

module.exports = {
  isAuth,
  authRole,
};
