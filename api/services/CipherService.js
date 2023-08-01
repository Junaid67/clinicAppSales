var jwt = require("jsonwebtoken");
var bcrypt = require("bcrypt-nodejs");
const { jwtSettings } = require('../../config/passport');
const saltRounds = bcrypt.genSaltSync(10);

/**
   * Hash the password field of the passed user.
   */
const hashPassword = function (password) {
    if (password) {
        return bcrypt.hashSync(password,saltRounds);
    }
};

/**
 * Compare user password hash with unhashed password
 * @returns boolean indicating a match
 */
const comparePassword = function (password, userPassword) {
    return bcrypt.compareSync(password, userPassword);
};

const createToken = (user) => {
    return jwt.sign(user, jwtSettings.secret, {
        algorithm: jwtSettings.algorithm,
        issuer: jwtSettings.issuer,
        audience: jwtSettings.audience,
    });
};
const verifyToken = async function (token) {
    let response = await new Promise(async (resolve, reject) => {
        jwt.verify(
            token,
            jwtSettings.secret,
            {
                algorithm: jwtSettings.algorithm,
                issuer: jwtSettings.issuer,
                audience: jwtSettings.audience,
            },
            function (err, decoded) {
                if (err) reject(err);
                else resolve(decoded);
            }
        );
    });

    return response;
};
module.exports = {
    createToken,
    verifyToken,
    hashPassword,
    comparePassword
}