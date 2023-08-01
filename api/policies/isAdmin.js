module.exports = async function (req, res, next) {
    let token = req.header("Authorization");
    if (!token) {
        res.error({ message: 'Authentication Token is Required!' });
    }
    if (token.startsWith('Bearer ')) {
        // Remove Bearer from string
        token = token.slice(7, token.length);
    }
    const verify = await CipherService.verifyToken(token);
    const response = await sails.models.admin.findOne({ email: verify.email });
    if (!response) {
        return res.error({ message: 'Unauthorized!' });
    }
    const isSession = await sails.models.session.findOne({ session_uuid: verify.session_uuid });
    if (!isSession) {
        return res.error({ message: 'InValid Token!' });
    }
    next();
};
