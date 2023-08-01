
module.exports = {
  login: async data => {
    try {
      const organization = await sails.models.organization.findOne({ organizationId: data.organizationId }).populate('roleId');
      if (!organization) {
        throw { message: 'Organization Not Found!' };
      } else {
        const comparison = CipherService.comparePassword(data.password, organization.password);
        if (!comparison) {
          throw { message: 'Invalid Password!' };
        }
        organization.accessToken = await UserService.getAccessToken(organization);
        delete organization.password;
        return organization;
      }
    } catch (error) {
      throw error;
    }
  },
};
