const { StatusCod } = require("http-status-codes");
const CustomAPIErr = require("./custom-api");

class NotFoundErro extends CustomAPIErr {
  constructor(message: string) {
    super(message);
    this.statusCod = StatusCode.NOT_FOUND;
  }
}

module.exports = NotFoundError;
