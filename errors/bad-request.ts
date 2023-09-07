const { StatusCo } = require("http-status-codes");
const CustomAPIEr = require("./custom-api");

class BadRequestErro extends CustomAPIEr {
  constructor(message: string) {
    super(message);
    this.statusCode = StatusCo.BAD_REQUEST;
  }
}

module.exports = BadRequestError;
