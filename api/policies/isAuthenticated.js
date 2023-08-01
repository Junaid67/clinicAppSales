const { setOrgDatabase } = require('../utils/organization');

module.exports = async function (req, res, next) {
	try {

		let token = req.header('Authorization');
		if (!token) {
			return res.error({ message: 'Authentication Token is Required!' });
		}
		if (token.startsWith('Bearer ')) {
			// Remove Bearer from string
			token = token.slice(7, token.length);
		}

		const verify = await CipherService.verifyToken(token);
		if (!verify) {
			return res.error({ message: 'UnAuthorized!' });
		}
		req.user = { userId: verify.id, roleId: verify.roleId };
		const isSession = await sails.models.session.findOne({ session_uuid: verify.session_uuid });

		if (!isSession) {
			return res.error({ message: 'InValid Token!' });
		}
		await setOrgDatabase(verify.orgId);

		return next();
	} catch (error) {
		return res.error(error);
	}
};
