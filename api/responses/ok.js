/**
 * 200 (OK) Response
 *
 * General status code. Most common code used to indicate success.
 * The actual response will depend on the request method used.
 * In a GET request, the response will contain an entity corresponding to the requested resource.
 * In a POST request the response will contain an entity describing or containing the result of the action.
 */

module.exports = function (data, options, root) {
  let success = true;
  if(data.success != undefined){
    success = data.success;
  }
  // console.log(data)
  // if (data.data && typeof data.data.createdAt === 'object' && data.data.createdAt && data.data.createdAt != null){
  //   data.data.createdAt = (data.data.createdAt).toISOString().split("T").join(" ");
  // } else if (data.data && Array.isArray(data.data) && data.data.length > 0){
  //   data.data.forEach((item)=>{
  //     if (item.createdAt && item.createdAt != null){
  //       item.createdAt = item.createdAt.toISOString().split("T").join(" ");
  //     }
  //   });
  // }
  var response = _.assign(
    {
      message: data.message || "Operation is successfully executed",
      data: data || [],
      success: success
    },
    root
  );
  // this will/can also overwrite the default values above, if sent (code, message, data. success)
  if (options) {
    Object.keys(options).forEach(function (key) {
      response[key] = options[key];
    });
  }

  this.req._sails.log.silly("Sent (200 OK)\n", response);

  this.res.status(200);
  this.res.json(response);
};
