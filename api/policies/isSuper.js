const { setOrgDatabase } = require('../utils/organization');

module.exports = async function (req, res, next) {
	try {
		var role;
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
		if (verify.roleId > 0) {
			role = await sails.models.role.findOne({ id: verify.roleId });

			if (!['ADMIN', 'ORGANIZATION'].includes(role.name)) {
				return res.error({ message: 'You are not authorized to perform this action!' });
			}
		}
		req.user = { userId: verify.id, roleId: verify.roleId };
		const isSession = await sails.models.session.findOne({ session_uuid: verify.session_uuid });

		if (!isSession) {
			return res.error({ message: 'InValid Token!' });
		}
		let organizationId;
		if (req.body && req.body.organizationId) {
			organizationId = req.body.organizationId;
		} else {
			organizationId = req.query.organizationId;
		}
		if (role.name === 'ORGANIZATION' && verify.orgId !== organizationId) {
			return res.error({ message: 'You are not Authorized to perform this operation' });
		}
		await setOrgDatabase(organizationId);

		return next();
	} catch (error) {
		return res.error(error);
	}
};
