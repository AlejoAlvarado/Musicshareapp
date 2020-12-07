export function handleResponse() {
  return (req, res, next) => {
    if (!req.ok) {
      if ([401, 403].indexOf(req.status) !== -1) {
        // auto logout if 401 Unauthorized or 403 Forbidden response returned from api
        this.$store.dispatch("logout");
      }
    }

    next();
  };
}
