const { ValidateSignature } = require("../../utils");
const ErrorHandler = require("../../utils/error-handler");

/**
 *
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {import('express').NextFunction} next
 * @returns
 */
module.exports = async (req, res, next) => {
  const isAuthorized = await ValidateSignature(req);

  if (isAuthorized) {
    return next();
  }

  return ErrorHandler(
    {
      message: "Not Authorized",
      statusCode: 403,
    },
    req,
    res,
    next
  );
};
