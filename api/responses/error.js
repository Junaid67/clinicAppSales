module.exports = function error(optionalData) {
  console.log(optionalData.statusCode, optionalData.stack, optionalData.message);
  let req = this.req;
  let res = this.res;

  let statusCodeToSet =
    optionalData && typeof optionalData === "object"
      ? optionalData.statusCode || 400
      : 400;

  if (optionalData && !isNaN(Number(optionalData))) {
    statusCodeToSet = optionalData;
    optionalData = {};
  }

  let reply = {
    statusCode: statusCodeToSet,
    data: (optionalData && (optionalData.stack || optionalData.data)) || {},
    message: (optionalData && optionalData.message) || undefined,
  };

  return res.reply(reply);
};
