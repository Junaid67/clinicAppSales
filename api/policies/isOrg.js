const { setOrgDatabase } = require('../utils/organization');

module.exports = async function (req, res, next) {
    try {
        const { organizationId } = req.body;
        console.log('>>>>>>>>>>>',organizationId);
        await setOrgDatabase(organizationId);
        return next();
    } catch (error) {
        return res.error(error);
    }
};
