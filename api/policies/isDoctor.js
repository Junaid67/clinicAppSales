module.exports = async function (req, res, next) {
    try {
        const role = await sails.models.role.findOne({ id: req.user.roleId });
        if (role.name === 'DOCTOR') {
            return next();
        } else {
            res.error({ message: `Not Authorized for this Role: ${role.name}` });
        }
    } catch (error) {
        return res.error(error);
    }
};
