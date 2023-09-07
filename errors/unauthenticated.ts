const { StatusCode } = require("http-status-codes");
const CustomAPIErro = require("./custom-api");

class UnauthenticatedErro extends CustomAPIErro {
  constructor(message: string) {
    super(message);
    this.statusCode = StatusCode.UNAUTHORIZED;
  }
}

module.exports = UnauthenticatedError;
