const { adminDB } = require('../../utils/keys');

const setOrgDatabase = async (orgId) => {
  const org = await sails.models.organization.findOne({ organizationId: orgId });
  if (!org) {
    throw { message: 'Organization Not Found!' };
  }
  const url = `mysql://${adminDB.user}:${adminDB.password}@${adminDB.host}:${adminDB.port}/${org.organizationDb}`;
  let Driver = sails.getDatastore().driver;
  let manager = (
    await sails.getDatastore().driver.createManager({ connectionString: url })
  ).manager;
  let conn = await Driver.getConnection({ manager: manager });
  sails.db = conn.connection;
  sails.customManger = manager;
  return true;
};

module.exports = { setOrgDatabase };
