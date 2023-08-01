const passport = require('passport');
const passportJWT = require('passport-jwt');
const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;

const EXPIRES_IN_MINUTES = 60 * 24;
const SECRET =
	process.env.tokenSecret ||'c3b0e6ede45465abfb319fbe5d45969322932b04631685cc0c5b1ebbbe090410';
const ALGORITHM = 'HS256';
const ISSUER = 'clinicApp';
const AUDIENCE = 'clinicApp';

const JWT_STRATEGY_CONFIG = {
	jwtFromRequest: ExtractJWT.fromHeader('authorization'),
	secretOrKey: SECRET,
	issuer: ISSUER,
	audience: AUDIENCE,
	passReqToCallback: false,
	ignoreExpiration: true,
};

function _onJwtStrategyAuth(payload, next) {
	var person = payload.person;
	return next(null, person, {});
}

passport.use(new JWTStrategy(JWT_STRATEGY_CONFIG, _onJwtStrategyAuth));

module.exports.jwtSettings = {
	expiresIn: EXPIRES_IN_MINUTES,
	secret: SECRET,
	algorithm: ALGORITHM,
	issuer: ISSUER,
	audience: AUDIENCE,
};