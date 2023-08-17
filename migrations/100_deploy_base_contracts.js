const MasterRegistry = artifacts.require("MasterRegistry");
const ModulesRegistry = artifacts.require("ModulesRegistry");
const SchemasRegistry = artifacts.require("SchemasRegistry");
const AttestorsRegistry = artifacts.require("AttestorsRegistry");
const { retry } = require('../helpres/retry')

module.exports = async function (deployer) {
    await retry(() => deployer.deploy(SchemasRegistry))
};